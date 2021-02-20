function byClass(selClass, parent = document) {
  return parent.getElementsByClassName(selClass);
}
function queryAll(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

function forEachHTML(els, fn, scope) {
  for (let i = 0, numEls = els.length; i < numEls; i++) fn.call(scope, els[i], i);
}

function addEvent(el, ev, fn, opts) {
  el.addEventListener(ev, fn, opts);
}
function removeEvent(el, ev, fn, opts) {
  el.removeEventListener(ev, fn, opts);
}

function getAttr(el, attr) {
  return el.getAttribute(attr);
}
function remAttr(el, attr) {
  el.removeAttribute(attr);
}

const defOpts = {
  allowCss3Support: true,
  css3easing:       'linear',
  delayBeforeStart: 1000,
  direction:        'left',
  duplicated:       false,
  duration:         5000,
  easing:           'linear',
  gap:              20,
  pauseOnCycle:     false,
  pauseOnHover:     false,
  speed:            0,
  startVisible:     false,
};


class marquee {

  constructor( el, opts ) {

    if ( typeof el === 'undefined' )
      throw new Error( 'el cannot be undefined' );

    if ( el === null )
      throw new Error( 'el cannot be null' );

    opts = {
      ...opts,
      ...defOpts,
    };

    this._loopCount = 3;

    // Check for data-option since they have top priority
    for ( const option in defOpts ) {

      let currData = getAttr( el, `data-${defOpts[option]}` );

      if ( currData !== null && currData !== '' ) {

        if ( currData === 'true' || currData === 'false' )
          currData = Boolean( currData );

        opts[option] = currData;

      }

    }

    // Reintroduce speed as an option. It calculates duration as a factor of the container width
    // measured in pixels per second.
    if ( opts.speed )
      opts.duration = parseInt( el.clientWidth ) / opts.speed * 1000;

    // no gap if not duplicated
    opts.gap = opts.duplicated ? parseInt( opts.gap ) : 0;

    // wrap inner content into a div
    el.innerHTML = `<div class="js-marquee">${el.innerHTML}</div>`;

    // Make a copy of the element
    const marq = byClass( 'js-marquee', el )[0];

    marq.style.marginRight = `${opts.gap}px`;
    marq.style.float       = 'left';

    if ( opts.duplicated )
      el.appendChild( marq.cloneNode( true ) );

    // wrap both inner elements into one div
    el.innerHTML = `<div style="width:100000px" class="js-marquee-wrapper">${el.innerHTML}</div>`;

    // Save the reference of the wrapper
    const marqWrap = byClass( 'js-marquee-wrapper', el )[0],
      vertical     = ( opts.direction === 'up' || opts.direction === 'down' );

    this._marqWrap = marqWrap;

    // If direction is up or down, get the height of main element
    if ( vertical ) {

      const contHeight = el.clientHeight;
      this._contHeight = contHeight;

      remAttr( marqWrap, 'style' );

      el.style.clientHeight = `${contHeight}px`;

      const marqs = byClass( 'js-marquee', el ),
        marqNums  = marqs.length - 1;

      // Change the CSS for js-marquee element
      forEachHTML( marqs, ( currEl, ind ) => {

        currEl.style.float        = 'none';
        currEl.style.marginRight  = '0px';

        // Remove bottom margin from 2nd element if duplicated
        if ( opts.duplicated && ind === marqNums )
          currEl.style.marginBottom = '0px';
        else
          currEl.style.marginBottom = `${opts.gap}px`;

      });

      const elHeight = parseInt( marqs[0].clientHeight + opts.gap );

      this._elHeight = el_elHeight;

      // adjust the animation duration according to the text length
      if ( opts.startVisible && !opts.duplicated ) {
        // Compute the complete animation duration and save it for later reference
        // formula is to: (Height of the text node + height of the main container / Height of the main container) * duration;
        this._completeDuration = ( elHeight + contHeight) / parseInt( contHeight ) * opts.duration;
        opts.duration = elHeight / parseInt( contHeight ) * opts.duration;
      } else // formula is to: (Height of the text node + height of the main container / Height of the main container) * duration;
        opts.duration = elHeight / parseInt( contHeight ) / parseInt( contHeight ) * opts.duration;

    } else {

      // Save the width of the each element so we can use it in animation
      const elWidth = parseInt( byClass( 'js-marquee', el )[0].clientWidth + opts.gap ),
        contWidth   = el.clientWidth;

      this._contWidth = contWidth;
      this._elWidth   = elWidth;

      // adjust the animation duration according to the text length
      if ( opts.startVisible && !opts.duplicated ) {
        // Compute the complete animation duration and save it for later reference
        // formula is to: (Width of the text node + width of the main container / Width of the main container) * duration;
        this._completeDuration = ( elWidth + contWidth) / parseInt( contWidth ) * opts.duration;
        // (Width of the text node / width of the main container) * duration
        opts.duration = elWidth / parseInt( contWidth ) * opts.duration;
      } else // formula is to: (Width of the text node + width of the main container / Width of the main container) * duration;
        opts.duration = elWidth / parseInt( contWidth ) / parseInt( contWidth ) * opts.duration;

    }

    // if duplicated then reduce the duration
    if ( opts.duplicated )
      opts.duration = opts.duration / 2;

    this._opts = opts;

    let animStr = '';

    if ( opts.allowCss3Support ) {

      const animationName = 'marqueeAnimation-' + Math.floor( Math.random() * 10000000 );
      animStr = `${animationName} ${opts.duration / 1000}s ${opts.delayBeforeStart / 1000}s infinite ${opts.css3easing}`;

      this._animName = animationName;

    }

    this._animStr = animStr;

    // if duplicated option is set to true than position the wrapper
    if ( opts.duplicated ) {

      if ( vertical ) {

        if ( opts.startVisible )
          marqWrap.style.transfrom = 'translateY(0px)';
        else
          marqWrap.style.transfrom = `translateY(${opts.direction === 'up' ? this._contHeight : ( -1 * ( ( this._elHeight * 2 ) - opts.gap ) ) }px)`;

      } else {

        if ( opts.startVisible )
          marqWrap.style.transfrom = 'translateC(0px)';
        else
          marqWrap.style.transfrom = `translateY(${opts.direction === 'left' ? this._contWidth : ( -1 * ( ( this._elWidth * 2 ) - opts.gap ) ) }px)`;

      }

      // If the text starts out visible we can skip the two initial loops
      if ( !opts.startVisible )
        this._loopCount = 1;

    } else if ( opts.startVisible ) {

      // We only have two different loops if marquee is duplicated and starts visible
      this._loopCount = 2;

    } else {
      if ( vertical )
        this._repositionVert();
      else
        this._repositionHor();
    }

    this.el = el;

    if ( opts.pauseOnHover ) {

      addEvent( this.el, 'mouseover', this.pause().bind( this ) );
      addEvent( this.el, 'mouseout', this.resume().bind( this ) );

    }

    this._animEnd = () => {
      this._animate( vertical );
      this.el.dispatchEvent( new CustomEvent( 'finished' ) );
    };

    if ( opts.allowCss3Support )
      this._animate( vertical );
    else
      this._startAnimationWithDelay();

  }

  _animate( vertical = false ) {

    const opts = this._opts;

    if ( opts.duplicated ) {

      // When duplicated, the first loop will be scroll longer so double the duration
      if ( this._loopCount === 1 ) {

        let duration = opts.duration;

        if ( vertical )
          duration = ( opts.direction === 'up' ) ? opts.direction + ( this._contHeight / ( this._elHeight / opts.direction ) ) : opts.direction * 2;
        else
          duration = ( opts.direction === 'left' ) ? opts.direction + ( this._contWidth / ( this._elWidth / opts.direction ) ) : opts.direction * 2;

        this._animStr = `${this._animName} ${duration / 1000}s ${opts.delayBeforeStart / 1000}s ${opts.css3easing}`;

      // On 2nd loop things back to normal, normal duration for the rest of animations
      } else if ( this._loopCount === 2 )
        this._animStr = `${animationName} ${this._completeDuration / 1000}s ${opts.delayBeforeStart / 1000}s infinite ${opts.css3easing}`;

      this._loopCount++;

    }

    let animationCss = '';

    if ( vertical ) {
      if ( opts.duplicated ) {

        if ( this._loopCount > 2 )
          this._marqWrap.style.transfrom = `translateY(${( opts.direction === 'up' ) ? 0 : -1 * this._elHeight}px)`;

        animationCss = `translateY(${( opts.direction === 'up' ) ? -1 * this._elHeight : 0 }px)`;

      } else if ( opts.startVisible ) {

        // This loop moves the marquee out of the container
        if ( this._loopCount === 2 ) {

          this._animStr = `${animationName} ${opts.duration / 1000}s ${opts.delayBeforeStart / 1000}s ${opts.css3easing}`;
          animationCss = `translateX(${( opts.direction === 'left' ) ? -1 * this._elWidth : this._contWidth }px)`;

          this._loopCount++;

        } else if ( this._loopCount === 3 ) {

          this._animStr = `${animationName} ${this._completeDuration / 1000}s 0s infinite ${opts.css3easing}`;
          this._repositionVert();

        }

      } else {

        this._repositionVert();
        animationCss = `translateY(${( opts.direction === 'up' ) ? -1 * this._marqWrap.clientHeight : this._contHeight}px)`;

      }
    } else {
      if ( opts.duplicated ) {

        if ( this._loopCount > 2 )
          this._marqWrap.style.transfrom = `translateX(${( opts.direction === 'left' ) ? 0 : -1 * this._elWidth}px)`;

        animationCss = `translateX(${( opts.direction === 'left' ) ? -1 * this._elWidth : 0 }px)`;

      } else if ( opts.startVisible ) {

        // This loop moves the marquee out of the container
        if ( this._loopCount === 2 ) {

          this._animStr = `${animationName} ${opts.duration / 1000}s ${opts.delayBeforeStart / 1000}s ${opts.css3easing}`;
          animationCss = `translateY(${( opts.direction === 'up' ) ? -1 * this._elHeight : this._contHeight }px)`;

          this._loopCount++;

        } else if ( this._loopCount === 3 ) {

          this._animStr = `${animationName} ${opts.duration / 1000}s 0s infinite ${opts.css3easing}`;
          this._repositionHor();

        }

      } else {
        this._repositionHor();
        animationCss = `translateY(${( opts.direction === 'left' ) ? -1 * this._elWidth : this._contHeight}px)`;
      }
    }

    // fire event
    this.el.dispatchEvent( new CustomEvent( 'beforeStarting' ) );

    // Append animation
    this._marqWrap.style.animation = this._animStr;

    const keyFrameCss = `@${this._animName} {
      100% {
        transform: ${animationCss};
      }
    }`;

    const styles = queryAll( 'style', this._marqWrap );

    if ( styles.length )
      styles[styles.length - 1].innerHTML = keyFrameCss;
    else {

      const styleEl = document.createElement( 'style' );
      style.innerHTML = keyFrameCss;

      query( 'head' ).appendChild( styleEl );

    }

    addEvent( this._marqWrap, 'animationiteration', this._animIter.bind( this ), {
      once: true,
    });
    addEvent( this._marqWrap, 'animationend', this._animEnd.bind( this ), {
      once: true,
    });

    setAttr( this.el, 'data-runningStatus', 'resumed' );

  }

  _animIter() {
    this.el.dispatchEvent( new CustomEvent( 'finished' ) );
  }

  _repositionVert() {
    this._marqWrap.style.transfrom = `translateY(${ this._opts.direction === 'up' ? this._contHeight : ( this._elHeight * -1 ) }px)`;
  }

  _repositionHor() {
    this._marqWrap.style.transfrom = `translateX(${ this._opts.direction === 'left' ? this._contWidth : ( this._elWidth * -1 ) }px)`;
  }

  pause() {
    this._marqWrap.style.playState = 'paused';
    this._status = 'paused';
  }

  resume() {
    this._marqWrap.style.playState = 'running';
    this._status = 'running';
  }

  toggle() {

    if ( this._status === 'paused' )
      this.resume();
    else if ( this._status === 'running' )
      this.pause();

  }

  /**
   * Stops all timers and removes events
   */
  destroy() {

    if ( this._opts.pauseOnHover ) {

      removeEvent( this.el, 'mouseover', this.pause().bind( this ) );
      removeEvent( this.el, 'mouseout', this.resume().bind( this ) );

    }

    removeEvent( this._marqWrap, 'animationiteration', this._animIter.bind( this ), {
      once: true,
    });
    removeEvent( this._marqWrap, 'animationend', this._animEnd.bind( this ), {
      once: true,
    });

  }

}

export default marquee;
