<style>
    div.container img{
        max-width: 2rem;
        max-height: 2rem;
    }
</style>

<template>
    <div style="width: 250px" class="pa-0 ma-0" >
        <v-row justify="center" class="mx-auto" style="width:250px">
        <v-avatar  size="245" style="border: grey 0.75px solid" tile >
        <v-img :src="defaultImage" ref="img"/>

        </v-avatar>

        </v-row>

        <v-row  style="width:250px"  justify="center" align="center">
            <v-btn   text id="vue-img-preview-button" align="right" @click="$refs.file.click ()" justify="center"  >
                <v-icon left>fa-camera</v-icon> Modifier
            </v-btn>

            <input v-show="false" type="file" id="file" ref="file" accept="image/*"  v-on:change="handleFileUpload()"/>

        </v-row>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                file: '',
                showPreview: false,
                imagePreview: '',
        }
        },
        props: {
            defaultImage:String
        },

        watch:{
            defaultImage:function(){
                this.$refs.img.src=this.defaultImage
            },
            imagePreview:function(){
                this.$refs.img.src=this.imagePreview
            }
        },
        methods: {
            handleFileUpload(){
                this.file = this.$refs.file.files[0];
                this.$emit('childToParent', this.file)
                let reader  = new FileReader();
                reader.addEventListener("load", function () {
                    this.showPreview = true;
                    this.imagePreview = reader.result;

                }.bind(this), false);
                if( this.file ){
                    if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
                        reader.readAsDataURL( this.file );
                    }
                    this.$emit('childToParent', this.file)
                }
            },
        }
    }
</script>

