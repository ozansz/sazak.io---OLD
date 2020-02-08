<template>
    <div id="LinkPage">
        <div v-if="!link_inactive" class="LinkPage__message">Redirecting...</div>

        <div v-if="link_inactive" class="LinkPage__message">Broken or inactive link</div>
        <div v-if="link_inactive" class="LinkPage__sub-message">You are being redirected to the home page now.</div>
    </div>
</template>

<script>
export default {
    name: 'LinkPage',
    data() {
        return {
            link_inactive: false
        }
    },
    mounted() {
        var vm = this

        this.$root.$data.$api.retrieveLink().get('/', {params: {code: this.$route.params.code}})
            .then((res) => {
                var link = res.data.link

                if (link === undefined) {
                    vm.link_inactive = true

                    setTimeout(() => {
                        window.location = 'https://ref.sazak.io/'
                    }, 2500)

                    return
                }

                if (!link.startsWith('http://') || !link.startsWith('https://')) {
                    window.location = 'http://' + link
                } else {
                    window.location = link
                }
            })
            .catch((err) => {
                if (err.response) {
                    alert(err.response.data)
                } else {
                    alert("Unknown error!")
                    console.log(err)
                }
            })
    }
}
</script>

<style scoped>
#LinkPage {
    text-align: center;
    width: 100%;
    height: 100%;
    color: #fff;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;
}


@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

.LinkPage__message {
    font-size: 2em;
}

.LinkPage__sub-message {
    font-size: 1em;
}
</style>