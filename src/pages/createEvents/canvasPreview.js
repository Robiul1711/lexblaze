export async function canvasPreview(
  image,
  canvas,
  crop = null,  // Make crop optional
  scale = 1,
  rotate = 0,
  flip = false,
) {
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    throw new Error('No 2d context');
  }

  const pixelRatio = window.devicePixelRatio;

  // If no crop is provided, use the full image dimensions
  const cropWidth = crop ? crop.width : image.width;
  const cropHeight = crop ? crop.height : image.height;
  const cropX = crop ? crop.x * (image.naturalWidth / image.width) : 0;
  const cropY = crop ? crop.y * (image.naturalHeight / image.height) : 0;

  // Set canvas size (accounting for device pixel ratio)
  canvas.width = Math.floor(cropWidth * pixelRatio);
  canvas.height = Math.floor(cropHeight * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = 'high';

  // Draw the image (either cropped or full)
  ctx.drawImage(
    image,
    cropX, cropY,                     // Source X, Y
    cropWidth, cropHeight,            // Source width & height
    0, 0,                             // Destination X, Y
    cropWidth, cropHeight             // Destination width & height
  );
}