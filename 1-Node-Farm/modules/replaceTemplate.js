module.exports = (temp, obj) => {
  let output = temp.replace(/{%Name%}/g, obj.productName);
  output = output.replace(/{%Img%}/g, obj.image);
  output = output.replace(/{%Price%}/g, obj.price);
  output = output.replace(/{%Quantity%}/g, obj.quantity);
  output = output.replace(/{%Nutrients%}/g, obj.nutrients);
  output = output.replace(/{%From%}/g, obj.from);
  output = output.replace(/{%Desc%}/g, obj.description);
  output = output.replace(/{%id%}/, obj.slug);

  if (!obj.organic) output = output.replace(/{%Not_Organic%}/g, "not-organic");

  return output;
};
