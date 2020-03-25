const clearFinal = (model) => {
  model.findOne({}, (err, doc) => {
    if (err) return;
    doc.tasks.final = [];
    doc.save();
    return;
  })
}

module.exports = clearFinal;
