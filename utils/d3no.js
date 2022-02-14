const fs = require('fs');
module.exports = function (dest, d3n, opts = {}, callback) {
  const d3 = d3n.d3;

  if (d3n.options.canvas) {
    const canvas = d3n.options.canvas;
    canvas.pngStream().pipe(fs.createWriteStream(`${dest}.png`));
    console.log(`>> Exported canvas to ${dest}.png`);
    return;
  }

  function eachGeoQuantize (d) {
    const coords = d3.select(this).attr('d') || ''
    const rounded = coords.replace(/[0-9]*\.[0-9]*/g, (x) => (+x).toFixed(4))
    d3.select(this).attr('d', rounded);
  }
  // reduce filesize of svg
  d3n.d3Element.selectAll('path').each(eachGeoQuantize);
  const svgString = d3n.svgString();
  fs.writeFile(`${dest}.svg`, svgString, function () {
  });
};