declare module "vanilla-marquee" {
    export default marquee;
    export type defaultOptions = {
        /**
         * - A css3 transtion timing
         */
        css3easing?: string | undefined;
        /**
         * - Time in milliseconds before the marquee starts animating
         */
        delayBeforeStart?: number | undefined;
        /**
         * - Direction towards which the marquee will animate ` 'left' | 'right' | 'up' | 'down'`
         */
        direction?: string | undefined;
        /**
         * - Should the marquee be duplicated to show an effect of continuous flow. Use this only when the text is shorter than the container
         */
        duplicated?: boolean | undefined;
        /**
         * - Duration in milliseconds in which you want your element to travel
         */
        duration?: number | undefined;
        /**
         * - Gap in pixels between the tickers. Will work only when the `duplicated` option is set to `true`
         */
        gap?: number | undefined;
        /**
         * - Pause the marquee on hover
         */
        pauseOnHover?: boolean | undefined;
        /**
         * - Speed will override duration. Speed allows you to set a relatively constant marquee speed regardless of the width of the containing element. Speed is measured in pixels/second
         */
        speed?: number | undefined;
        /**
         * - The marquee will be visible from the start if set to `true`
         */
        startVisible?: boolean | undefined;
    };
    /**
     * Vanilla js marquee based on jQuery.marquee
     * https://github.com/aamirafridi/jQuery.Marquee
     */
    class marquee {
        /**
         * Constructor
         *
         * @param {Element} el - The element where the marquee is applied
         * @param {defaultOptions} opts - the options
         */
        constructor(el: Element, opts: defaultOptions);
        _loopCount: number;
        _marqWrap: any;
        _contHeight: number | undefined;
        _elHeight: any;
        _completeDuration: number | undefined;
        _contWidth: number | undefined;
        _elWidth: number | undefined;
        _opts: defaultOptions;
        _animName: string;
        _animStr: string;
        el: Element;
        /**
         * Method for animation end event
         */
        _animEnd: () => void;
        /**
         * Build the css string for the animation
         *
         * @privte
         * @param {String} [name=''] - animation name
         * @param {Number} [duration=0] - Animation duration (in s)
         * @param {Number} [delay=0] - Animation delay before starting (in s)
         * @param {String} [loops=''] - Animation iterations
         *
         * @returns {String} css animation string
         */
        _animationStr(name?: string | undefined, duration?: number | undefined, delay?: number | undefined, loops?: string | undefined): string;
        /**
         * Animation of the marquee
         *
         * @private
         * @param {Boolean} vertical - Vertical direction
         */
        private _animate;
        /**
         * Event fired on Animation iteration
         *
         * @private
         */
        private _animIter;
        /**
         * Reposition the Wrapper vertically
         *
         * @private
         */
        private _repositionVert;
        /**
         * Reposition the Wrapper horizontally
         *
         * @private
         */
        private _repositionHor;
        /**
         * Pause the animation
         */
        pause(): void;
        _status: string | undefined;
        /**
         * Resume the animation
         */
        resume(): void;
        /**
         * Toggle animation playing status
         */
        toggle(): void;
        /**
         * Destorys the instance and removes events
         */
        destroy(): void;
    }
}
