import React from 'react';

// Generate an array [start, start + 1, ..., end] inclusively
const genArray = (start, end) =>
  Array.from(Array(end - start + 1).keys()).map(v => v + start);

const IMAGES = {
  accessory: genArray(1, 20).map(
    n => `${process.env.PUBLIC_URL}/assets/KittyAvatar/accessorie_${n}.png`
  ),
  body: genArray(1, 15).map(
    n => `${process.env.PUBLIC_URL}/assets/KittyAvatar/body_${n}.png`
  ),
  eyes: genArray(1, 15).map(
    n => `${process.env.PUBLIC_URL}/assets/KittyAvatar/eyes_${n}.png`
  ),
  mouth: genArray(1, 10).map(
    n => `${process.env.PUBLIC_URL}/assets/KittyAvatar/mouth_${n}.png`
  ),
  fur: genArray(1, 10).map(
    n => `${process.env.PUBLIC_URL}/assets/KittyAvatar/fur_${n}.png`
  ),
};

const dnaToAttributes = dna => {
  const attribute = (index, type) =>
    IMAGES[type][dna[index] % IMAGES[type].length];

  return {
    body: attribute(0, 'body'),
    eyes: attribute(1, 'eyes'),
    accessory: attribute(2, 'accessory'),
    fur: attribute(3, 'fur'),
    mouth: attribute(4, 'mouth'),
  };
};

const PolkapetAvatar = ({
  dna,
  deadStatus,
  heightOuterStyle = 160,
  widthOuterStyle = '50%',
  heightInnerStyle = 150,
}) => {
  const outerStyle = {
    height: heightOuterStyle,
    position: 'relative',
    width: widthOuterStyle,
  };
  const innerStyle = {
    height: heightInnerStyle,
    position: 'absolute',
    top: '3%',
    left: '50%',
  };

  if (!dna) return null;

  const cat = dnaToAttributes(dna);
  console.log(
    'PolkapetAvatar: type :',
    typeof deadStatus,
    'value : ',
    deadStatus
  );

  if (deadStatus === 'true') {
    return (
      <div style={outerStyle}>
        <img alt="body" src={cat.body} style={innerStyle} />
        <img alt="fur" src={cat.fur} style={innerStyle} />
        <img alt="mouth" src={cat.mouth} style={innerStyle} />
        <img alt="eyes" src={cat.eyes} style={innerStyle} />
        <img alt="accessory" src={cat.accessory} style={innerStyle} />
        <img
          alt="death"
          src={`${process.env.PUBLIC_URL}/assets/KittyAvatar/dead.png`}
          style={innerStyle}
        />
      </div>
    );
  } else {
    return (
      <div style={outerStyle}>
        <img alt="body" src={cat.body} style={innerStyle} />
        <img alt="fur" src={cat.fur} style={innerStyle} />
        <img alt="mouth" src={cat.mouth} style={innerStyle} />
        <img alt="eyes" src={cat.eyes} style={innerStyle} />
        <img alt="accessory" src={cat.accessory} style={innerStyle} />
      </div>
    );
  }
};

export default PolkapetAvatar;
