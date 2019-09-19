(function (root) {
    var WATER = root.SHRI_ISLANDS.WATER;
    var ISLAND = root.SHRI_ISLANDS.ISLAND;

    /**
     * Функция находит кол-во островов на карте
     * ВАЖНО! Сигнатуру функции изменять нельзя!
     *
     * @param {number[][]} map карта островов представленная двумерной матрицей чисел
     * @returns {number} кол-во островов
     */
    let point = 0;
    let checked = [];
    const shift = 1;

    function solution(map) {
        let islands = 0;
        let checkedIndex = 0;
        const rowsLength = map.length;
        const colsLength = map[0].length;

        for (let r = 0; r < rowsLength; ++r) {
            for (let c = 0; c < colsLength; ++c) {
                if (map[r][c] === 1 && notInChecked(r, c)) {
                    point = [r, c];
                    checked.push(point);

                    while (checkedIndex < checked.length) {
                        horizontalShift(map, checked[checkedIndex][0], checked[checkedIndex][1]);
                        verticalShift(map, checked[checkedIndex][0], checked[checkedIndex][1]);
                        checkedIndex++;
                    }
                ++islands;
                }
            }
        }
        return islands;
    }

    function horizontalShift(map, x, y) {
        let positiveShift = true;
        let negativeShift = true;
        const length = map[0].length;

        for (let i = x, j = y; ((j < length) && (positiveShift)); ++j) {
            if (map[i][j + shift] === 1 && notInChecked(i, j + shift)) {
                point = [i, j + shift];
                checked.push(point);
            } else {
                positiveShift = false;
            }
        }

        for (let i = x, j = y; ((j >= 0) && (negativeShift)); --j) {
            if (map[i][j - shift] === 1 && notInChecked(i,j - shift)) {
                point = [i, j - shift];
                checked.push(point);
            } else {
                negativeShift = false;
            }
        }
    }

    function verticalShift(map, x, y) {
        let positiveShift = true;
        let negativeShift = true;
        const length = map.length;

        for (let i = x, j = y; ((i < length) && (i !== length - 1) && (positiveShift)); ++i) {
            if (map[i + shift][j] === 1 && notInChecked(i + shift, j)) {
                point = [i + shift, j];
                checked.push(point);
            } else {
                positiveShift = false;
            }
        }

        for (let i = x, j = y; ((i > 0) && (negativeShift)); --i) {
            if (map[i - shift][j] === 1 && notInChecked(i - shift, j)) {
                point = [i - shift, j];
                checked.push(point);
            } else {
                negativeShift = false;
            }
        }
    }

    /**
     * @desc Take x and y coordinates of current point for check is point already checked
     * @param x { number } x value of current point
     * @param y { number } y value of current point
     * @return { boolean }
     */
    function notInChecked(x, y) {
        const length = checked.length;

        for (let i = 0; i < length; ++i) {
            if (checked[i][0] === x && checked[i][1] === y) {
                return false;
            }
        }
        return true;
    }

    root.SHRI_ISLANDS.solution = solution;
})(this);
