export const cropAndResize = (file: File) =>
  new Promise<Blob>((resolve) => {
    const img = new Image();

    // 이미지 로드 후, 캔버스에 그린 후 Blob 객체 반환
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      // 캔버스 크기 설정 및 이미지 중앙에 위치시키기
      const ratio = Math.min(400 / img.width, 400 / img.height);
      canvas.width = img.width * ratio;
      canvas.height = img.height * ratio;
      ctx?.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        (canvas.width - img.width * ratio) / 2,
        (canvas.height - img.height * ratio) / 2,
        img.width * ratio,
        img.height * ratio
      );

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
