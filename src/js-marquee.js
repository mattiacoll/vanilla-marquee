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

    for ( const option in defOpts ) {

      let currData = getAttr( el, `data-${defOpts[option]}` );

      if ( currData !== null && currData !== '' ) {

        if ( currData === 'true' || currData === 'false' )
          currData = Boolean( currData );

        opts[option] = currData;

      }

    }

    if ( opts.speed )
      opts.duration = parseInt( el.clientWidth ) / opts.speed * 1000;

    opts.gap = opts.duplicated ? parseInt( opts.gap ) : 0;

    el.innerHTML = `<div class="js-marquee">${el.innerHTML}</div>`;

    const marq = byClass( 'js-marquee', el )[0];

    marq.style.marginRight = `${opts.gap}px`;
    marq.style.float       = 'left';

    if ( opts.duplicated )
      el.appendChild( marq.cloneNode( true ) );

    el.innerHTML = `<div style="width:100000px" class="js-marquee-wrapper">${el.innerHTML}</div>`;

    const marqWrap = byClass( 'js-marquee-wrapper', el )[0],
      vertical     = ( opts.direction === 'up' || opts.direction === 'down' );

    this._marqWrap = marqWrap;

    if ( vertical ) {

      const contHeight = el.clientHeight;
      this._contHeight = contHeight;

      remAttr( marqWrap, 'style' );

      el.style.clientHeight = `${contHeight}px`;

      const marqs = byClass( 'js-marquee', el ),
        marqNums  = marqs.length - 1;

      foreachHTML( marqs, ( currEl, ind ) => {

        currEl.style.float        = 'none'
        currEl.style.marginRight  = '0px'

        if ( opts.duplicated && ind === marqNums )
          currEl.style.marginBottom = '0px';
        else
          currEl.style.marginBottom = `${opts.gap}px`;

      });

      const elHeight = parseInt( marqs[0].clientHeight + opts.gap );

      this._elHeight = el_elHeight;

      if ( opts.startVisible && !opts.duplicated ) {
        this._completeDuration = ( elHeight + contHeight) / parseInt( contHeight ) * opts.duration;
        opts.duration = elHeight / parseInt( contHeight ) * opts.duration;
      } else
        opts.duration = elHeight / parseInt( contHeight ) / parseInt( contHeight ) * opts.duration;

    } else {

      const elWidth = parseInt( byClass( 'js-marquee', el )[0].clientWidth + opts.gap ),
        contWidth   = el.clientWidth;

      this._contWidth = contWidth;
      this._elWidth   = elWidth;

      if ( opts.startVisible && !opts.duplicated ) {
        this._completeDuration = ( elWidth + contWidth) / parseInt( contWidth ) * opts.duration;
        opts.duration = elWidth / parseInt( contWidth ) * opts.duration;
      } else
        opts.duration = elWidth / parseInt( contWidth ) / parseInt( contWidth ) * opts.duration;

    }

    if ( opts.duplicated )
      opts.duration = opts.duration / 2;

    this._opts = opts;

    let animStr = '';

    if ( opts.allowCss3Support ) {

      const animationName = animationName = 'marqueeAnimation-' + Math.floor( Math.random() * 10000000 );
      animStr = `${animationName} ${opts.duration / 1000}s ${opts.delayBeforeStart / 1000}s infinite ${opts.css3easing}`;

    }

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

      if ( !opts.startVisible )
        this._loopCount = 1;

    } else if ( opts.startVisible ) {

      this._loopCount = 2;

    } else {
      if ( vertical )
        this._repositionVert();
      else
        this._repositionHor();
    }

    if ( opts.pauseOnHover ) {

      addEvent( el, 'mouseover', this.pause().bind( this ) );
      addEvent( el, 'mouseout', this.resume().bind( this ) );

    }

    if ( opts.allowCss3Support )
      this._animate( loopCount );
    else
      this._startAnimationWithDelay();

  }

  _animate( loopCount = 0 ) {

    if ( this._opts.duplicated ) {
      if ( loopCount === 1 ) {
        this._originalDuration = this._opts.duration;

        
      }
    }

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

  destroy() {

    if ( this._opts.pauseOnHover ) {

      removeEvent( el, 'mouseover', this.pause().bind( this ) );
      removeEvent( el, 'mouseout', this.resume().bind( this ) );

    }

  }

}

export default marquee;