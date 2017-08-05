module.exports = {
  compare: (o1, o2) => JSON.stringify(o1) === JSON.stringify(o2),

  /* joinWith - shim by Joseph Myers 7/6/2013 */
  /* https://gist.github.com/xerardoo/dfb33ae174150e0642c0 */
  merge: (array, that, by, select, omit) => {
    let together = [], tk = {}, length = 0;
    if (select) {
      select.map((x) => {
        select[x] = 1;
      })
    }

    fields = (it) => {
      var f = {}, k;
      for (k in it) {
        if (!select) {
          f[k] = 1; continue;
        }
        if (omit ? !select[k] : select[k]) {
          f[k] = 1;
        }
      }

      return f;
    }

    add = (it) => {
      let pkey = '.'+it[by], pobj = {};
      if (!tk[pkey]) {
        tk[pkey] = pobj,
        together[length++] = pobj;
      }

      pobj = tk[pkey];

      for (let k in fields(it)) {
        pobj[k] = it[k];
      }
    }

    try {
      array.map(add);
    } catch(e) {
      console.log("Here is an error with", that);
    }

    that.map(add);
    return together;
  }
}
