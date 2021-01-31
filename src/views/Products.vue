<template>
  <div>
    <Navbar />
    <div class="container">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-sm-8 d-flex justify-content-start">
              <h3>Products</h3>
            </div>
            <div class="col-sm-4 d-flex justify-content-end">
              <button type="button" @click="openModal" name="button">Add New</button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Description</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody v-for="product in products" :key="product.id">
              <tr>
                <th>{{product_serial}}</th>
                <th><img :src="'http://localhost:2020/storage/'+product.Image" alt="" height="30" width="30">{{product.Title}}</th>
                <th>{{product.Description}}</th>
                <th>${{product.Price}}</th>
                <th><button class="btn btn-info btn-sm" @click="editModal(product)" type="button" name="button">Edit</button>
                    <button class="btn btn-danger btn-sm" @click.prevent="deleteProduct(product.id)" type="button" name="button">Delete</button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ProductModal />
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
            <button type="button" @click="closeModal"> <i class="fas fa-times"></i> </button>
          </div>
          <div class="modal-body">
            <div class="col-sm-12">
              <form @submit.prevent="isEdit ? editProduct() : addProduct()">
                <div class="form-group">
                  <label>Title</label>
                  <input v-model="form.title" type="text" name="title" placeholder=""
                    class="form-control" :class="{ 'is-invalid': form.errors.has('title') }">
                  <has-error :form="form" field="title"></has-error>
                </div>

                <div class="form-group">
                  <label>Description</label>
                  <input v-model="form.description" type="text" name="description" placeholder=""
                    class="form-control" :class="{ 'is-invalid': form.errors.has('description') }">
                  <has-error :form="form" field="description"></has-error>
                </div>

                <div class="form-group">
                  <label>Price</label>
                  <input v-model="form.price" type="text" name="price" placeholder=""
                    class="form-control" :class="{ 'is-invalid': form.errors.has('price') }">
                  <has-error :form="form" field="price"></has-error>
                </div>

                <div class="form-group">
                  <label>Image</label>
                  <input @change="fileSelected" type="file" name="image" placeholder=""
                    class="form-control" :class="{ 'is-invalid': form.errors.has('image') }">
                  <has-error :form="form" field="image"></has-error>
                </div>
                <img v-if="form.image!= ''" :src="form.image" alt="" height="200" width="200">
                <div class="mb-3">
                  <input type="submit" class="btn btn-primary" value="Submit">
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import ProductModal from '@/components/ProductModal.vue'
import { Form, HasError, AlertError } from 'vform'
import axios from 'axios'
import {mapActions,mapGetters} from 'vuex'
import $ from 'jquery'
import Vue from 'vue'
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
  export default{
    name: 'Products',
    data(){
      return {
        product_serial: 1,
        isEdit: false,
        form: new Form({
          id : '',
          title: '',
          description: '',
          price: '',
          image: ''
        })
      }
    },
    components:{
      Navbar,ProductModal
    },
    computed: {
      ...mapGetters({
        products: 'products'
      })
    },
    methods:{
      ...mapActions({
        loadProduct: 'loadData',
        uploadProduct: 'uploadProduct'
      }),
      openModal(){
        this.isEdit = false
        this.form.reset();
        $('#productModal').modal('show')
      },
      editModal(product){
        this.isEdit = true
        this.form.reset()
        $('#productModal').modal('show')

        this.form.id    = product.id
        this.form.title = product.Title
        this.form.description = product.Description
        this.form.price = product.Price
        this.form.image = product.Image

        console.log(this.form)
        console.log('modal clicked')
      },
      closeModal(){
        $('#productModal').modal('hide')
        console.log('modal closed')
      },
      fileSelected(e){
        let image = e.target.files[0]
        let reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onload = e => {
          //console.log(e.target.result)
          this.form.image = e.target.result;
        }
      },
      addProduct(){
        console.log(this.form.image)
        this.uploadProduct(this.form).then(()=>{
          this.loadProduct()
          this.form.title = ''
          this.form.description = ''
          this.form.price = ''
          this.form.image = ''
          $('#productModal').modal('hide')

        })
      },
      async editProduct(){
        console.log('edit')
        let response = await axios.post('http://localhost:2020/api/products/edit',this.form)
        console.log(response)
        this.loadProduct()
        $('#productModal').modal('hide')
      },
      async deleteProduct(id){
        if(window.confirm('Are You Sure You Want to Delete This Record')){
          let response = await axios.post(`http://localhost:2020/api/products/delete/${id}`)
          console.log(response)
          this.loadProduct()
        }
      }
    },
    created(){
      this.loadProduct()
    },


  }
</script>
