export const generatePageNumbersArray = ({
  pageCount,
  pageIndex
}: {
  pageCount: number;
  pageIndex: number;
}) => {
  const buttonsSet = new Set<number>([1, pageCount]);

  buttonsSet.add(pageIndex);
  //backwards buttons
  if (pageIndex > 2) {
    buttonsSet.add(pageIndex - 1);
    buttonsSet.add(pageIndex - 2);
  }

  //forwards buttons
  if (pageIndex < pageCount - 1) {
    buttonsSet.add(pageIndex + 1);
    buttonsSet.add(pageIndex + 2);
  }

  return Array.from(buttonsSet).sort((a, b) => a - b);
};

export const addEllipsisToPageNumbersArray = (pageNumbersArray: number[]): (number | '...')[] => {
  const result: (number | '...')[] = [];

  for (let i = 0; i < pageNumbersArray.length; i++) {
    result.push(pageNumbersArray[i]);

    if (pageNumbersArray[i + 1] && pageNumbersArray[i + 1] - pageNumbersArray[i] > 1) {
      result.push('...');
    }
  }

  return result;
};

export const generatePageLabelsArray = ({
  pageCount,
  pageIndex
}: {
  pageCount: number;
  pageIndex: number;
}): (number | '...')[] => {
  const pageNumbersArray = generatePageNumbersArray({ pageCount, pageIndex });
  const pageLabelsArray = addEllipsisToPageNumbersArray(pageNumbersArray);

  return pageLabelsArray;
};
