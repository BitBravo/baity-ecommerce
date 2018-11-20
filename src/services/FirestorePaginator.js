function FirestorePaginator(ref, defaults) {
  var paginator = this;
  var dafaults = defaults || {};
  var pageSize = defaults.pageSize ? parseInt(defaults.pageSize, 10) : 9;

  this.hasMore = true;
  this.ref = ref;
  this.lastVisible;

  this.on = function (callback) {
    var first = this.ref
      .limit(pageSize);

    return first.get().then((documentSnapshots) => {
      // Get the last visible document
      this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      if (documentSnapshots.docs.length < pageSize) {
        this.hasMore = false
      } else {
        // Construct a new query starting at this document,
        // get the next 12 .
        this.nextSet = this.ref
          .startAfter(this.lastVisible)
          .limit(pageSize);
      }
      return documentSnapshots.docs;
    });

  }

  /*
  * call to load the next set of records
  */
  this.next = function (callback) {
    return this.nextSet.get().then((documentSnapshots) => {
      // documentSnapshots.docs.length < 1 => no more records to load
      if (documentSnapshots.docs.length < 1) {
        this.hasMore = false;
        return
      }
      console.log("last ", this.lastVisible);
      console.log("length ", documentSnapshots.docs.length);
      this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

      this.nextSet = this.ref
        .startAfter(this.lastVisible)
        .limit(pageSize);
      return documentSnapshots.docs;

    });
  }
}
export default FirestorePaginator;
