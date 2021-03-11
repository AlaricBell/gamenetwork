import {Component} from 'react';

export default class Slider extends Component {
    moveSlider(isActive) {
        const item1 = document.querySelector('.slider-item-1');
        const item2 = document.querySelector('.slider-item-2');
        const item3 = document.querySelector('.slider-item-3');

        if(!isActive) {
            clearInterval(slider);
            return;
        }

        const slider = setInterval(function() {
            if(item1.classList.contains('active')) {
                item2.style.opacity = 1;
                item3.style.opacity = 0;
                item1.classList.remove('active');
                item2.classList.remove('next');
                item3.classList.remove('hide');
                item1.classList.add('hide');
                item2.classList.add('active');
                item3.classList.add('next');
            }
            else if(item2.classList.contains('active')) {
                item3.style.opacity = 1;
                item1.style.opacity = 0;
                item1.classList.remove('hide');
                item2.classList.remove('active');
                item3.classList.remove('next');
                item1.classList.add('next');
                item2.classList.add('hide');
                item3.classList.add('active');
            }
            else if(item3.classList.contains('active')) {
                item1.style.opacity = 1;
                item2.style.opacity = 0;
                item1.classList.remove('next');
                item2.classList.remove('hide');
                item3.classList.remove('active');
                item1.classList.add('active');
                item2.classList.add('next');
                item3.classList.add('hide');
            }
        }, 2500)
    }

    componentDidMount() {
        this.moveSlider(true);
    }

    componentWillUnmount() {
        this.moveSlider(false);
    }

    render() {
        return (
            <div className="slider">
                <img src="/img/placeholder.png" alt="" className="slider-item slider-item-1 active"/>
                <img src="/img/placeholder.png" alt="" className="slider-item slider-item-2 next"/>
                <img src="/img/placeholder.png" alt="" className="slider-item slider-item-3 hide"/>
            </div>
        )
    }
  }