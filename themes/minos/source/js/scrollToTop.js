(function () {
    // add css
    var style = document.createElement('style');
    var cssText = document.createTextNode('.move-to-top {position: fixed;border-radius: 50%;cursor: pointer;background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJOSURBVFhHxZchaBxBFIbvjooTJ04UeiLQFK4QGRERURFRF1ORgxMVrYusiAz0XEREZEULqU9FRUpNICIyohWBHLTQQEQrAwm0kHCX7+3+u9zuzV5ud+fSDx7/vNmZ92Zm52b2KmUYDAbL2JLc+2M4HD4g8Q46RK+xLavT49lCogYJDy35KNTtIbMdBAnqJDoKMjqY+SBI8C5MlQ1tdtXcLwReU447oe1LdfMDMW3T/QjD3w1tfyMNdS8PwV4FkUcgib2OBWwe6+FfW/0IPXUvD8G/KWgA/qYexVCdGCRtzvWoHARqK2YA/l9kbHmps9d0GTQS+Mt6nElNOokX0oh+tVq9UjmGuhvkJPRiVqWZTDOAx9IAEi0yszm5MUz4IZI+lsfapZlmAK7dbMdw4sDBf8vg0odQS1ocZus8+aweW5d9VXUC6o8VphgEeKNYhSHGjsLlw0fyCGJtK+wYVWkC+rSwc8c7LcMT4p2pHOPchCTvek5udKUJnAMgeVNFbzCpRyommOZn6AvnimYN4EDqky/S6WDnnrJsMfjp2y4T2qbvhF9IXaETTHoFHTqNnvn7+B9UzoQ2n5DPoRf4dkd02Ff/wpoc0NnO/egq7mH2QTrpm9BWrYluRj428UZ0ngNpiLWAnNksKNvdkPVf4DttLmhTx9q1Wi19O/qBWe1h9p3wHN1AW+h7PZ49JDRWSLqL2X+EFavQ41zc5zngxNcA/rAAP1XORaEBkOwjEl8sbLw+G+6p3FwUGgDJXpPUBmC/8f8HG3CO1XgmtwCVyi2SCFoR4AaQFAAAAABJRU5ErkJggg==");background-position: center;background-repeat: no-repeat;transition-duration: 0.4s;background-color: #009688;width: 0;height: 0;box-shadow: 1px 1px 4px;opacity: 1;}.move-to-top.show {width: 70px;height: 70px;}.move-to-top.moving {opacity: 0;}.move-to-top:hover {box-shadow: 2px 2px 8px;background-color: #00b4a3;}.move-to-top:active {box-shadow: inherit;}@media (max-width: 768px) {.move-to-top {right: 45px;bottom: 45px;}.move-to-top.show {right: 10px;bottom: 10px;}.move-to-top.moving {bottom: 200px;}}@media (min-width: 768px) {.move-to-top {right: 85px;bottom: 135px;}.move-to-top.show {right: 50px;bottom: 100px;}.move-to-top.moving {bottom: 300px;}}');
    style.appendChild(cssText);
    document.body.appendChild(style);
    // end add css

    var moveToTopBtn = document.createElement('div');
    moveToTopBtn.classList.add('move-to-top');
    document.body.appendChild(moveToTopBtn);

    var animationFn = window.requestAnimationFrame;
    if (animationFn == undefined) {
        animationFn = function (fn) {
            setInterval(fn, 100);
        };
    }

    moveToTopBtn.addEventListener('transitionend', function (e) {
        if (e.propertyName == 'opacity' && getComputedStyle(moveToTopBtn).opacity == '0') { // 火箭升空动画结束，重置按钮状态
            moveToTopBtn.style.transition = 'none';
            moveToTopBtn.classList.remove('show');
            moveToTopBtn.classList.remove('moving');
        }
    });

    moveToTopBtn.addEventListener('click', function () {
        moveToTopBtn.classList.add('moving');
        easeMoveToTop();
    });

    function easeMoveToTop() {
        window.removeEventListener('scroll', scrollHandler);
        animationFn(function () {
            var delta = Math.max(document.body.scrollTop * .4, 9);
            if (document.body.scrollTop > delta) {
                document.body.scrollTop = document.body.scrollTop - delta;
                easeMoveToTop();
            } else {
                document.body.scrollTop = 0;
                window.addEventListener('scroll', scrollHandler);
            }
        });
    }

    window.addEventListener('scroll', scrollHandler);

    function scrollHandler() {
        moveToTopBtn.style.transition = '';
        if (window.scrollY > 0) {
            moveToTopBtn.classList.add('show');
        } else {
            moveToTopBtn.classList.remove('show');
        }
    }
})();
