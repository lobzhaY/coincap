export const getChangePercentColor = (str: string): string => {
    return parseFloat(str) < 0 ? '#B33734' : '#298D30';
};