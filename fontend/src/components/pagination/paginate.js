
export const paginate = (dataset=[1,2,3,4,5,7,8,9],pageItem = 5, currentPage = 1) => {
    const startIndex = (currentPage - 1) *  pageItem;
    const endIndex = startIndex + pageItem;
    return dataset.slice(startIndex, endIndex);

}

