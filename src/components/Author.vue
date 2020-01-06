<template>
	<div class="author">

		<g-image alt="Author image" class="author__image" src="~/assets/images/author.jpg" width="180" height="180" blur="5" />

		<h1 v-if="showTitle" class="author__site-title">
			Ozan Sazak
		</h1>

		<p class="author__intro">
			Passionate developer and CS student at METU. GNU/Linux, cybersecurity, compilers, crawlers, APIs and DevOps are my world!
		</p>

		<p class="author__links">
			<a href="https://github.com/ozansz" target="_blank">
				<img class="author__social-refs author__github-ref" src="/GitHub-Mark-Light.png" alt="github.com/ozansz">
			</a>
			<a href="https://gitlab.com/ozansz" target="_blank">
				<img class="author__social-refs" src="/GitLab_Logo.svg" alt="gitlab.com/ozansz">
			</a>
			<a href="https://www.linkedin.com/in/ozan-sazak-1489a9155/" target="_blank">
				<img class="author__social-refs" style="border-radius: 5px;" src="/linkedin.png" alt="linkedin.com/in/ozan-sazak-1489a9155">
			</a>
			<a href="mailto:ozan.sazak@ieee.metu.edu.tr">
				<img class="author__social-refs author__mail-ref" src="/mailicon.png">
			</a>
		</p>

	</div>
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<script>
export default {
	props: ['showTitle'],
}
</script>

<style lang="scss">
.author {
	margin: 0 auto;
	max-width: 500px;
	text-align: center;
	padding: calc(var(--space) / 2) 0;

	&__image {
		border-radius: 100%;
		width: 90px;
		height: 90px;
		margin-bottom: 1em;
	}

	&__intro {
		opacity: .8;
	}

	&__site-title {
		font-size: 1.5em;
	}

	&__links {
		margin-top: -.5em;
		a {
			margin: 0 .5em;
		}
	}

	&__social-refs {
		width: 36px;
	}

	&__github-ref {
		filter: var(--github-invert)
	}

	&__mail-ref {
		filter: var(--mail-invert)
	}
}
</style>