export const cropAndResize = (file: File) =>
  new Promise<Blob>((resolve) => {
    const img = new Image();

    // 이미지 로드 후, 캔버스에 그린 후 Blob 객체 반환
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // 이미지를 적절한 크기로 crop
      const cropWidth = Math.min(img.width, img.height);
      const cropX = (img.width - cropWidth) / 2;
      const cropY = (img.height - cropWidth) / 2;

      // 캔버스 크기 설정
      const size = 400;
      canvas.width = size;
      canvas.height = size;

      // 이미지 리사이즈
      ctx?.drawImage(img, cropX, cropY, cropWidth, cropWidth, 0, 0, size, size);

      // 변환된 Blob 객체 반환
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        }
      }, 'image/jpeg');
    };

    // 이미지 로드
    img.src = URL.createObjectURL(file);
  });
