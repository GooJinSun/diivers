export const cropAndResize = (file: File) =>
  new Promise<Blob>((resolve) => {
    const img = new Image();

    // 이미지 로드 후, 캔버스에 그린 후 Blob 객체 반환
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // 이미지의 가로세로 비율(ratio)을 계산하여, 크롭할 영역 계산
      const ratio = Math.min(400 / img.width, 400 / img.height);
      const cropWidth = img.width * ratio;
      const cropHeight = img.height * ratio;
      const cropX = (img.width - cropWidth) / 2;
      const cropY = (img.height - cropHeight) / 2;

      // 캔버스 크기 설정
      canvas.width = 400;
      canvas.height = 400;

      // 이미지 중앙에 위치시키기
      ctx?.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, 400, 400);

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
