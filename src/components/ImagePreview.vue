<style>
    div.container img{
        max-width: 2rem;
        max-height: 2rem;
    }
</style>

<template>
    <v-container fluid >
    <div size="100"  tile align="center"  class="mx-auto" justify="center">
        <v-row align="center"  class="mx-auto" justify="center">
        <v-img :src="defaultImage" ref="img" alt="" size="100%"/>
        </v-row>
        </div>
        <v-row  style="border-style: none" align="center"  class="mx-auto" justify="center">
            <v-btn  id="vue-img-preview-button" align="center" @click="$refs.file.click ()" radius="20"  justify="center" color="primary" width="100%">
                changer image
            </v-btn>
            <input v-show="false" type="file" id="file" ref="file" accept="image/*"  v-on:change="handleFileUpload()"/>

        </v-row>
    </v-container>
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

