$( document ).ready( function () {

	const disablePreloader = () => {
		let preloader = $( '.preloader' );
		setTimeout( function () {
			if ( !preloader.hasClass( 'done' ) ) {
				preloader.addClass( 'done' );
			}
		}, 1000 );
	};


	const typeBlogText = () => {
		// let elemHeight = document.getElementsByClassName('post')[0].clientHeight;
		// console.log(elemHeight);
		let typeElem = new Typed( '.typed', {
			strings : [ "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio... " ],
			typeSpeed : 0,
			showCursor : true
		} );
	};

	$( function () {
		$( "body" ).niceScroll( {
			zindex : 10000
		} );
	} );
	let wow = new WOW( {
		offset : 100,
		mobile : false,
		callback : function ( box ) {
			// console.log();
			if ( $( box ).hasClass( 'typed' ) ) {
				typeBlogText()
			}
		}
	} );
	wow.init();

	let progress1 = $( '.progress-bar-1' ).ClassyLoader( {
		width : 125,
		height : 125,
		speed : 10,
		diameter : 60,
		fontSize : '25px',
		fontFamily : "Open-Sans",
		fontColor : 'rgb(129,134,142)',
		lineColor : 'rgb(25,189,154)',
		percentage : 0,
		lineWidth : 4,
		start : 'top',
		remainingLineColor : 'rgb(4,115,120)'
	} );
	let progress2 = $( '.progress-bar-2' ).ClassyLoader( {
		width : 125,
		height : 125,
		speed : 10,
		diameter : 60,
		fontSize : '25px',
		fontFamily : "Open-Sans",
		fontColor : 'rgb(129,134,142)',
		lineColor : 'rgb(25,189,154)',
		percentage : 0,
		lineWidth : 4,
		start : 'top',
		remainingLineColor : 'rgb(4,115,120)'
	} );
	let progress3 = $( '.progress-bar-3' ).ClassyLoader( {
		width : 125,
		height : 125,
		speed : 10,
		diameter : 60,
		fontSize : '25px',
		fontFamily : "Open-Sans",
		fontColor : 'rgb(129,134,142)',
		lineColor : 'rgb(25,189,154)',
		percentage : 0,
		lineWidth : 4,
		start : 'top',
		remainingLineColor : 'rgb(4,115,120)'
	} );

	const progressAnimating = () => {
		if ( ( $( '.services__progress' ).css( 'visibility' ) !== 'hidden' ) && ( progress1.getPercent() === 0 ) ) {
			progress1.setPercent( 80 );
			progress1.draw();
			progress2.setPercent( 65 );
			progress2.draw();
			progress3.setPercent( 70 );
			progress3.draw();
		}
	};

	const getRandomInt = ( min, max ) =>
		Math.floor( Math.random() * ( max - min ) ) + min;

	const featuresSlider = () => {
		let projectsSlider = $( '.projects-slider' );
		let target;

		projectsSlider.mouseover( function ( event ) {
			console.log( event );
			target = event.target.parentNode;
			Array.from( projectsSlider.children() ).forEach( function ( elem ) {
				$( elem ).removeClass( 'projects-slider__slide_active' );
			} )
		} );

		projectsSlider.mouseleave( function () {
			$( target ).addClass( 'projects-slider__slide_active' );
		} );
	};

	const fixedHeader = () => {
		$( '.site-header__paralax-bg' ).css( { 'top' : -( $( window ).scrollTop() / 4 ) } );


		let header = $( '.site-header__header' );
		let headerSubstitute = $( '.site-header__header-substitute' );
		if ( window.pageYOffset > 10 ) {
			header.addClass( 'site-header__header_fixed' );
			headerSubstitute.addClass( 'site-header__header-substitute_visible' );
		}
		else {
			header.removeClass( 'site-header__header_fixed' );
			headerSubstitute.removeClass( 'site-header__header-substitute_visible' );
		}
	};

	const scrollToSection = () => {
		event.preventDefault();
		let id = $( event.target ).attr( 'href' );
		let top = id === '#site-header' ? $( id ).offset().top : $( id ).offset().top - 100;
		$( 'body,html' ).animate( { scrollTop : top }, 1000 );
	};

	const split = ( array, cols ) => {
		let splittedArray = [];
		if ( cols === 1 ) return array;
		let size = Math.ceil( array.length / cols );
		array.forEach( ( elem, i ) => {
			if ( i % size === 0 ) splittedArray.push( [ elem ] );
			else splittedArray[ Math.floor( i / size ) ].push( elem );
		} );
		return splittedArray;
	};

	const randomizePortfolioSlide = ( slide ) => {
		let splittedSlide = split( Array.from( $( slide ).children() ), 4 );
		splittedSlide.forEach( column => {
			let remainingCells = 20;
			column.forEach( ( elem, index ) => {
				if ( index !== column.length - 1 ) {
					let minimalNextElementsCells = ( ( column.length ) - index - 1 ) * 5;
					let maxElemCells = remainingCells - minimalNextElementsCells + 1;
					let currentElemCells = getRandomInt( 5, maxElemCells > remainingCells / 2 ? remainingCells / 2 + 1 : maxElemCells );
					remainingCells -= currentElemCells;
					$( elem ).css( 'grid-row-end', `span ${currentElemCells}` )
				} else $( elem ).css( 'grid-row-end', `span ${remainingCells}` )
			} );
		} )
	};

	Array.from( $( '.portfolio-slider__slide' ) ).forEach( elem => {
		randomizePortfolioSlide( $( elem ) );
	} );

	const changeNavLinks = () => {
		let viewedElem = $( inWindow( '.nav-site-header, .nav-about, .nav-portfolio, .nav-services, .nav-team, .nav-blog' )[ 0 ] );
		let currentElem = $( '.site-header__link_active' );
		if ( currentElem.attr( 'href' ) !== '#' + viewedElem.attr( 'data-nav' ) && viewedElem.attr( 'data-nav' ) !== undefined ) {
			currentElem.removeClass( 'site-header__link_active' );
			$( `.site-header__link[href="#${viewedElem.attr( 'data-nav' )}"]` ).addClass( 'site-header__link_active' )
		}
	};

	const inWindow = ( s ) => {
		let scrollTop = $( window ).scrollTop();
		let windowHeight = $( window ).height();
		let currentEls = $( s );
		let result = [];
		currentEls.each( function () {
			let el = $( this );
			let offset = scrollTop > 0 ? el.offset().top - 200 : el.offset().top;
			if ( ( scrollTop <= offset && ( el.height() + offset ) <= ( scrollTop + windowHeight ) ) || ( ( el.height() + offset ) > ( scrollTop + windowHeight ) && scrollTop > offset ) ) {
				result.push( this );
			}
		} );
		return $( result );
	};

	const portfolioSlider = () => {
		$( '.portfolio-slider__tabs-btn' ).click( function ( event ) {
			let target = $( event.target );
			$( '.portfolio-slider__tabs-btn' ).removeClass( 'portfolio-slider__tabs-btn_active' );
			target.addClass( 'portfolio-slider__tabs-btn_active' );
			let tabIndex = target.attr( 'data-tab-index' );
			$( '.portfolio-slider__slide' ).removeClass( 'portfolio-slider__slide_active' );
			$( $( '.portfolio-slider__lane' ).children()[ tabIndex ] ).addClass( 'portfolio-slider__slide_active' );
		} )
	};

	const likePortfolioProject = () => {
		$( '.portfolio-slider__action-btn_like' ).click( function () {
			$( this ).toggleClass( 'portfolio-slider__action-btn_like_active' );
			if ( $( this ).html() === '<i class="fal fa-heart"></i>' ) $( this ).html( '<i class="fa fa-heart"></i>' );
			else $( this ).html( '<i class="fal fa-heart"></i>' )
		} )
	};

	const teamSlider = ( slider ) => {
		let content = $( slider ).children( '.horizontal-slider__content' );
		content.css( 'height', content.attr( 'data-height' ) );
		let slides = $( slider ).children( '.horizontal-slider__content' ).children();
		$( slider ).children( ".horizontal-slider__control-arrows" ).click( function ( event ) {
			let currentSlide = content.children( '.horizontal-slider__slide_active' );
			let clickedArrow = $( event.target ).parents( 'button.horizontal-slider__arrow' );
			if ( clickedArrow.hasClass( 'horizontal-slider__arrow_right' ) ) goToNextSlide( currentSlide );
			else if ( clickedArrow.hasClass( 'horizontal-slider__arrow_left' ) ) goToPrevSlide( currentSlide );
		} );

		let switcherDots = $( slider ).children( '.horizontal-slider__switcher-dots' );

		switcherDots.click( function ( event ) {
			let clickedDot = $( event.target );

			if ( !( clickedDot.hasClass( 'horizontal-slider__dot_active' ) ) && clickedDot.hasClass( 'horizontal-slider__dot' ) ) {
				let currentSlide = content.children( '.horizontal-slider__slide_active' );
				console.log( content.children( '.horizontal-slider__slide_active' ) );
				let clickedDotIndex = switcherDots.children().index( clickedDot );

				currentSlide.removeClass( 'horizontal-slider__slide_active' );
				slides.eq( clickedDotIndex ).addClass( 'horizontal-slider__slide_active' );

				selectDot( clickedDot );
			}
		} );

		const goToNextSlide = ( currentSlide ) => {
			currentSlide.removeClass( 'horizontal-slider__slide_active' );
			let nextSlide = currentSlide.next().length === 0 ? slides.eq( 0 ) : currentSlide.next();
			nextSlide.addClass( 'horizontal-slider__slide_active' );
			selectDot( switcherDots.children().eq( slides.index( nextSlide ) ) );
		};
		const goToPrevSlide = ( currentSlide ) => {
			currentSlide.removeClass( 'horizontal-slider__slide_active' );
			let prevSlide = currentSlide.prev().length === 0 ? slides.eq( -1 ) : currentSlide.prev();
			prevSlide.addClass( 'horizontal-slider__slide_active' );
			selectDot( switcherDots.children().eq( slides.index( prevSlide ) ) );
		};
		const selectDot = ( dot ) => {
			let allDots = $( slider ).children( '.horizontal-slider__switcher-dots' )
			let currentDot = allDots.children( '.horizontal-slider__dot_active' );
			dot.addClass( 'horizontal-slider__dot_active' );
			currentDot.removeClass( 'horizontal-slider__dot_active' );
		}
	};
	const downScrollArrow = () => {
		const windowHeight = document.documentElement.clientHeight;
		$( 'body,html' ).animate( { scrollTop : windowHeight - 70 }, 1000 );
	};

	const scrolling = () => {
		fixedHeader();
		progressAnimating();
		changeNavLinks();
	};


	$( '.site-header__navigation-list' ).click( scrollToSection );
	featuresSlider();
	$( window ).scroll( scrolling );
	portfolioSlider();
	likePortfolioProject();
	$( '.horizontal-slider' ).each( function () {
		console.log( $( this ) );
		teamSlider( $( this ) );
	} );
	setTimeout( progressAnimating, 200 );
	$( '.site-header__button' ).on( 'click', downScrollArrow );
	disablePreloader();
} );
