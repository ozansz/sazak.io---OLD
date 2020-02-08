<template>
    <div id="HomePage">
        <div class="HomePage__title">ref.sazak.io</div>
        <div class="HomePage__desc">Firebase-powered URL shortener service</div>
        <div v-show="short_link_code === ''" style="width: 100%;">
            <input class="HomePage__link-input" placeholder="Enter the link here..." type="url" v-model="link" />
            <button class="HomePage__btn" @click="generate_code(link)">Shorten</button>
        </div>
        <div v-show="short_link_code !== ''">
            <hr>
            <div class="HomePage__link" id="link-str">ref.sazak.io/{{short_link_code}}</div>
            <div>
                <button class="HomePage__btn" @click="short_link_code = ''; link = ''">Go Back</button>
                <button class="HomePage__btn" @click="copy_to_clipboard('ref.sazak.io/'+short_link_code)">Copy to Clipboard</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomePage',
    data() {
        return {
            link: "",
            short_link_code: ""
        }
    },
    mounted() {
        console.log(this.$root)
    },
    methods: {
        generate_code(link) {
            var vm = this

            var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
            var regex = new RegExp(expression);
            
            if (!link.match(regex)) {
                alert("Please enter a valid URL.")
                return
            }

            this.$root.$data.$api.generateCode().get('/', {params: {link: link}})
                .then((res) => {
                    vm.short_link_code = res.data.code
                })
                .catch((err) => {
                    if (err.response) {
                        alert(err.response.data)
                    } else {
                        alert("Unknown error!")
                        console.log(err)
                    }
                })
        },
        copy_to_clipboard(text) {
            if (!navigator.clipboard) {
                this.fallbackCopyTextToClipboard(text);
                return;
            }
            navigator.clipboard.writeText(text).then(function() {
                alert("Copied the short link to the clipboard!")
            }, function(err) {
                alert('Could not copy text: ', err)
            });
        },
        fallbackCopyTextToClipboard(text) {
            var textArea = document.createElement("textarea");
            textArea.value = text;
            textArea.style.position="fixed";  //avoid scrolling to bottom
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();

            try {
                var successful = document.execCommand('copy');

                if (successful) {
                    alert("Copied the short link to the clipboard!")
                } else {
                    alert('Could not copy text: ', err)
                }
            } catch (err) {
                alert('Oops, unable to copy', err);
            }

            document.body.removeChild(textArea);
        }
    }
}
</script>

<style scoped>
#HomePage {
    text-align: center;
    /*background-color: #a4508b;
    background-color: #aff6cf;
    background-image: linear-gradient(315deg, #aff6cf 0%, #9f98e8 74%);*/
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

.HomePage__title {
    font-size: 3em;
}

.HomePage__desc {
    font-size: 1em;
    margin-bottom: 20px;
}

.HomePage__link-input {
    width: 80%;
    max-width: 768px;
    height: 24px;
    border-radius: 8px;
    border: 0px;
    padding: 4px;
    margin-top: 20px;
    color: #555;
}

.HomePage__btn {
    padding: 5px;
    background: #fff;
    border-radius: 8px;
    border: 0px;
    margin: 10px 0;
}

.HomePage__link {
    font-size: 23px;
    text-decoration: underline;
}

hr {
    width: 80vw;
    margin-bottom: 20px;
}
</style>