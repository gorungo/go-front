<template>
  <div id="idea-details" class="idea-details">
    <div class="container container--max-hd pb-4">
      <header class="mt-2">
        <div class="idea-details__heading">
          <slot name="breadcrumbs"/>
          <slot name="header"/>
        </div>
      </header>
      <main>
        <section class="sections-gap-vertical">
          <slot name="gallery"/>
        </section>
        <section class="sections-gap-vertical">
          <slot name="author"/>
        </section>
        <section class="sections-gap-vertical">
          <slot name="description"/>
        </section>
        <section class="section-details sections-gap-vertical">
          <slot name="itineraries"/>
        </section>
        <section class="section-details sections-gap-vertical">
          <slot name="dates"/>
        </section>
        <section class="section-details sections-gap-vertical">
          <slot name="booking-info"/>
        </section>
        <section class="section-details sections-gap-vertical">
          <slot name="contacts"/>
        </section>
      </main>
    </div>
  </div>
</template>

<script>

export default {
  name: "IdeaDetailsLayout",
}
</script>

