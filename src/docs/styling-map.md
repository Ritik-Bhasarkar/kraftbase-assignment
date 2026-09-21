/\*
Typography routing map
======================

Use the semantic role that matches the component's typography. The map is
kept here beside the mixins so component styles do not need hard-coded font
measurements or a second typography implementation.

src/components/ui/button/button.scss

- .button--small -> text-button-sm()
- .button--large -> text-button-lg()

src/components/layout/footer/footer.scss

- .footer--main--heading -> text-heading-xs()
- .footer--main--link, .footer--main--contact, .footer--copyright -> text-body-md()
- .footer--main--brand--name -> text-heading-sm()
- .footer--main--brand--text -> text-body-lg()

src/components/ui/avatar-group/avatar-group.scss

- .avatar-group--text -> text-label-md()

src/components/ui/navbar/navbar.scss

- .navbar--logo--name -> text-label-logo()
- .navbar--nav--item -> text-body-md()
- .navbar--nav--item[data-active] -> text-body-md-strong()

src/components/sections/testimonials/testimonials.scss

- .testimonials--card--head--info--name -> text-heading-sm()
- .testimonials--card--head--info--role -> text-label-lg()
- .testimonials--card--text -> text-body-xl-quote()

src/components/ui/badge-heading/badge-heading.scss

- .badge-heading--top--badge -> text-label-highlight()
- .badge-heading--top--text -> text-display()
- .badge-heading--subtext -> text-body-xl-medium()

src/components/ui/bento-item/bento-item.scss

- .bento-item--header--text -> text-heading-lg()
- .bento-item--subtext -> text-body-xl()

src/components/ui/marquee/marquee.scss

- .marquee--heading p -> text-label-marquee()
- .marquee--heading--highlight -> text-label-highlight()

src/components/sections/tab-slider/tab-slider.scss

- .tab-slider--tabs--tab -> text-heading-md()
- .tab-slider--tabs--tab[data-active] -> text-heading-md-strong()

src/components/ui/tab-slider-item/tab-slider-item.scss

- .tab-item--text -> text-body-xl-medium()

Visual-only styles inherit typography from their parent and do not need a
typography mixin.
\*/
