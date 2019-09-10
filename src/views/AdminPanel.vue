<template>
  <div class="admin">

    <!-- login alert -->
    <div id="login-alert">
      <p class="pink--text font-weight-medium">Nie jesteś zalogowany</p>
      <v-btn class="indigo lighten-3">Zaloguj</v-btn>
    </div>

    <!-- navigation through sections -->
    <nav id="section-nav">
      <v-toolbar class="green" height="35px" flat>
        <v-toolbar-items>
          <div v-for="(el, i) in navigation" :key="i">
            <v-btn 
              @click="show(el.path)"
              height="100%" 
              tile 
              text 
              class="nav-btn mx-2"
              :class="[toggle[el.path] ? 'active' : '']">{{ el.name }}</v-btn>
          </div>
        </v-toolbar-items> 
      </v-toolbar>
    </nav>

    <!-- ilustracje -->
    <v-content v-if="toggle.ilustracje">
      <v-container>
        <div class="d-flex justify-space-around flex-wrap">
          <div v-for="(item, i) in ilustracje" :key="i">
            <v-card
              elevation="3" 
              tile 
              class="display-card my-4 mx-2" 
              height="320px" 
              width="230px">
              <v-img class="display-img" :src="item.imageUrl">
                <v-card-title class="justify-space-between">
                  <v-btn depressed 
                    class="edit-btn" 
                    x-small 
                    fab
                    @click="onEdit(item)">
                    <v-icon>mdi-pencil-outline</v-icon>
                  </v-btn>
                  <v-btn 
                    depressed 
                    class="remove-btn" 
                    x-small 
                    fab
                    @click="onDeleteIlustracje(i)">
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </v-card-title>
              </v-img>
            </v-card>
          </div>
        </div>       
      </v-container>
    </v-content>

    <!-- design -->
    <v-content v-if="toggle.design">
      <v-container>
        <div class="d-flex justify-space-around flex-wrap">
          <div v-for="(item, i) in design" :key="i">
            <v-card 
              elevation="3" 
              tile 
              class="display-card my-4 mx-2" 
              height="320px" 
              width="230px">
              <v-img class="display-img" :src="item.imageUrl">
                <v-card-title class="justify-space-between">
                  <v-btn depressed 
                    class="edit-btn" 
                    x-small 
                    fab
                    @click="onEdit(item)">
                    <v-icon>mdi-pencil-outline</v-icon>
                  </v-btn>
                  <v-btn 
                    depressed 
                    class="remove-btn" 
                    x-small 
                    fab
                    @click="onDeleteDesign(i)">
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </v-card-title>
              </v-img>
            </v-card>
          </div>
        </div>       
      </v-container>
    </v-content>

    <!-- inne -->
    <v-content v-if="toggle.inne">
      <v-container>
        <div class="d-flex justify-space-around flex-wrap">
          <div v-for="(item, i) in inne" :key="i">
            <v-card 
              elevation="3" 
              tile 
              class="display-card my-4 mx-2" 
              height="320px" 
              width="230px">
              <v-img class="display-img" :src="item.imageUrl">
                <v-card-title class="justify-space-between">
                  <v-btn depressed 
                    class="edit-btn" 
                    x-small 
                    fab
                    @click="onEdit(item)">
                    <v-icon>mdi-pencil-outline</v-icon>
                  </v-btn>
                  <v-btn 
                    depressed 
                    class="remove-btn" 
                    x-small 
                    fab
                    @click="onDeleteInne(i)">
                    <v-icon>mdi-trash-can-outline</v-icon>
                  </v-btn>
                </v-card-title>
              </v-img>
            </v-card>
          </div>
        </div>       
      </v-container>
    </v-content>


    <!-- about -->
    <v-content v-if="toggle.about">
      <v-container>
        <div class="d-flex justify-space-around flex-wrap">
            <v-card 
              class="display-card my-4 mx-2" 
              height="420px" 
              width="302px"
              tile>
              <v-img 
                elevation="3" 
                class="display-img" 
                :src="about.imageUrl">
                <v-card-title class="justify-space-between">
                  <v-btn
                    depressed
                    class="edit-btn" 
                    x-small 
                    fab
                    @click="onAboutEdit(about)">
                    <v-icon>mdi-pencil-outline</v-icon>
                  </v-btn>
                </v-card-title>
              </v-img>
            </v-card>
        </div>       
      </v-container>
    </v-content>

    <!-- logo -->
    <v-content v-if="toggle.logo">
      <v-container>
        <div class="d-flex justify-space-around flex-wrap">
            <v-card 
              elevation="3" 
              tile 
              class="display-card my-4 mx-2" 
              height="150px" 
              width="562px">
              <v-img 
                class="display-img" 
                :src="logo.imageUrl">
                <v-card-title class="justify-space-between">
                  <v-btn 
                    class="edit-btn"
                    depressed
                    x-small 
                    fab
                    @click="onLogoEdit(logo)">
                    <v-icon>mdi-pencil-outline</v-icon>
                  </v-btn>
                </v-card-title>
              </v-img>
            </v-card>
        </div>       
      </v-container>
    </v-content>

    <!-- add new post - dialog -->
    <v-dialog 
      v-model="dialog"  
      persistent 
      no-click-animation>
      <template v-slot:activator="{ on }">
        <!-- button to add new content -->
        <div id="add-btn">
          <v-btn
            v-on="on" 
            @click="dialog != dialog; clear()" 
            fab 
            dark 
            color="indigo"><v-icon>mdi-plus</v-icon></v-btn> 
        </div>
      </template>
      <div>
        <v-card>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn
              small
              fab
              text
              @click="dialog = false; clear()"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
          <v-card-text>
            <!-- form -->
            <v-container class="form-content">
              <v-content>
                <v-form ref="form">
                  <v-row>
                    <v-col sm="7">
                      <v-row>
                        <h2 class="form-title mx-auto display-1">Dodaj nowy post</h2>
                      </v-row>
                      <v-row>
                        <v-file-input
                          class="form-file"
                          label="Plik"
                          ref="fileInput"
                          type="file"
                          filled
                          :rules="inputFileRules"
                          required
                          @change="onFileSelected"></v-file-input>                        
                      </v-row>
                      <v-row>
                        <v-select 
                          prepend-icon="mdi-file-document-box-outline"
                          filled
                          class="form-select" 
                          :items="categories" 
                          label="Kategoria"
                          v-model="post.category"
                          :rules="inputRules"
                          @change="onSelectCategory()"
                          required></v-select>                        
                      </v-row>
                      <v-row>
                        <v-text-field 
                          type="number"
                          class="form-order"
                          prepend-icon="mdi-reorder-vertical"
                          filled
                          label="Kolejność wyświetlania na stronie"
                          v-model="post.order"
                          disabled
                          :rules="inputOrderRules"
                          required></v-text-field>                      
                      </v-row>  
                      <v-row>
                        <v-text-field 
                          class="form-title"
                          prepend-icon="mdi-fountain-pen-tip"
                          filled
                          label="Tytuł"
                          v-model="post.title"
                          :rules="inputRules"
                          required></v-text-field>                        
                      </v-row>
                    </v-col>
                    <v-col sm="5">
                      <div class=selected-img>
                        <v-img 
                          :src="post.imageUrl" 
                          height="400px"
                          width="300px"></v-img>
                      </div>
                    </v-col>
                  </v-row>
                  <v-textarea
                    class="form-textarea"
                    prepend-icon="mdi-subtitles-outline"
                    filled
                    counter
                    label="Opis"
                    v-model="post.content"
                    :rules="inputRules"
                    required></v-textarea>
                  <div class="form-submit">
                    <v-btn 
                      depressed
                      color="green lighten-2"
                      :loading="loading"
                      @click="submit()">Zapisz</v-btn>
                  </div>        
                </v-form>               
              </v-content>             
            </v-container>       
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>

    <!-- edit post -->
    <v-dialog 
      v-model="edit"
      persistent
      no-click-animation>
      <div>
        <v-card>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn
              small
              fab
              text
              @click="edit = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
          <v-card-text>
            <!-- form -->
            <v-container class="form-content">
              <v-content>
                <v-form ref="form">
                  <v-row>
                    <v-col sm="7">
                      <v-row>
                        <h2 class="form-title mx-auto display-1">Edytuj post</h2>
                      </v-row>
                      <v-row>
                        <v-text-field 
                          class="form-title"
                          prepend-icon="mdi-fountain-pen-tip"
                          filled
                          label="Tytuł"
                          v-model="editPost.title"
                          :rules="inputRules"
                          required></v-text-field>                        
                      </v-row>
                      <v-row>
                        <v-text-field 
                          type="number"
                          class="form-order"
                          prepend-icon="mdi-reorder-vertical"
                          filled
                          label="Kolejność wyświetlania na stronie"
                          v-model="editPost.order"
                          :rules="inputOrderRules"
                          required></v-text-field>                      
                      </v-row>                      
                      <v-row>
                        <v-textarea
                          class="form-textarea"
                          prepend-icon="mdi-subtitles-outline"
                          filled
                          counter
                          label="Opis"
                          v-model="editPost.content"
                          :rules="inputRules"
                          required></v-textarea>                        
                      </v-row>
                    </v-col>
                    <v-col sm="5">
                      <div class=selected-img>
                        <v-img 
                          :src="editPost.imageUrl" 
                          height="400px"
                          width="300px"></v-img>
                      </div>
                    </v-col>
                  </v-row>

                  <div class="form-submit">
                    <v-btn 
                      depressed
                      color="green lighten-2" 
                      @click="submitEdit()">Zapisz</v-btn>
                  </div>        
                </v-form>               
              </v-content>             
            </v-container>       
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>

    <!-- edit about section -->
    <v-dialog 
      persistent
      no-click-animation
      v-model="editAboutDialog">
      <div>
        <v-card>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn
              small
              fab
              text
              @click="editAboutDialog = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
          <v-card-text>
            <!-- form -->
            <v-container class="form-content">
              <v-content>
                <v-form ref="formAbout">
                  <v-row>
                    <v-col sm="7">
                      <v-row>
                        <h2 class="form-title mx-auto display-1">Edytuj informacje o sobie</h2>
                      </v-row>
                      <v-row>
                        <v-file-input
                          class="form-file"
                          label="Plik"
                          ref="fileInput"
                          type="file"
                          filled
                          required
                          @change="onAboutEditFile"></v-file-input>                        
                      </v-row>
                      <v-row>
                        <v-text-field 
                          class="form-title"
                          prepend-icon="mdi-fountain-pen-tip"
                          filled
                          label="Tytuł"
                          v-model="editAbout.title"
                          :rules="inputRules"
                          required></v-text-field>                        
                      </v-row>
                      <v-row>
                        <v-textarea
                          class="form-textarea"
                          prepend-icon="mdi-subtitles-outline"
                          filled
                          counter
                          label="Opis"
                          v-model="editAbout.content"
                          :rules="inputRules"
                          required></v-textarea>                        
                      </v-row>
                    </v-col>
                    <v-col sm="5">
                      <div class=selected-img>
                        <v-img 
                          :src="editAbout.imageUrl" 
                          height="400px"
                          width="300px"></v-img>
                      </div>
                    </v-col>
                  </v-row>

                  <div class="form-submit">
                    <v-btn 
                      depressed
                      color="green lighten-2" 
                      @click="submitEditAbout()">Zapisz</v-btn>
                  </div>        
                </v-form>               
              </v-content>             
            </v-container>       
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>

    <!-- edit logo -->
    <v-dialog 
      persistent
      no-click-animation
      v-model="editLogoDialog">
      <div>
        <v-card>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn
              small
              fab
              text
              @click="editLogoDialog = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
          <v-card-text>
            <!-- form -->
            <v-container class="form-content">
              <v-content>
                <v-form ref="formLogo">
                  <v-row>
                    <v-col sm="7">
                      <v-row>
                        <h2 class="form-title mx-auto display-1">Edytuj logo</h2>
                      </v-row>
                      <v-row>
                        <v-file-input
                          class="form-file"
                          label="Plik"
                          ref="fileInput"
                          type="file"
                          filled
                          required
                          @change="onLogoEditFile"></v-file-input>                        
                      </v-row>
                    </v-col>
                    <v-col sm="5">
                      <div class=selected-img>
                        <v-img 
                          :src="editLogo.imageUrl" 
                          height="80px"
                          width="300px"></v-img>
                      </div>
                    </v-col>
                  </v-row>

                  <div class="form-submit">
                    <v-btn 
                      depressed
                      color="green lighten-2" 
                      @click="submitEditLogo()">Zapisz</v-btn>
                  </div>        
                </v-form>               
              </v-content>             
            </v-container>       
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>

  </div>
</template>

<script>
import db from '@/fb'

export default {
  data() {
    return {
      loading: false,
      post: {
        order: 0,
        category: '',
        title: '',
        content: '',
        imageUrl: '',
        image: null
      },
      editPost: {
        order: 0,
        dataId: '',
        category: '',
        title: '',
        content: '',
        imageUrl: '',
        image: null
      },
      editAbout: { 
        category: '',
        title: '', 
        content: '', 
        imageUrl: '' ,
        image: null
      },
      editLogo: { 
        category: '',
        imageUrl: '',
        image: null
      },      
      inputRules: [
        v => v.length >= 1 || 'Uzupełnij pole'
      ],
      inputOrderRules: [
        v => (v > 0) || 'Uzupełnij pole liczbą'
      ],
      inputFileRules: [
        v => v.length == null || 'Uzupełnij pole'
      ],
      categories: ['Ilustracje', 'Design', 'Inne'],
      dialog: false,
      edit: false,
      editAboutDialog: false,
      editLogoDialog: false,
      toggle: {
        ilustracje: true,
        design: false,
        inne: false,
        about: false,
        logo: false
      },
      navigation: [
        { name: 'ilustracje', path: 'ilustracje' },
        { name: 'design', path: 'design' },
        { name: 'inne', path: 'inne' },
        { name: 'o mnie', path: 'about' },
        { name: 'logo', path: 'logo' }
      ],
      ilustracje: [],
      design: [],
      inne: [],
      about: { 
        category: 'about', 
        title: 'About me', 
        content: 'test content', 
        imageUrl: require('@/assets/me.jpg') 
      },
      logo: { 
        category: 'logo', 
        imageUrl: require('@/assets/logo.jpg') 
      },
      order: 0
    }
  },
  methods: {
    clear() {
      this.post.order = null;
      this.post.category = '';
      this.post.title = '';
      this.post.content = '';
      this.post.imageUrl = '';
      this.post.image = null;
    },
    show(section) {
      for(let key in this.toggle) {
        if(key === section) {
          this.toggle[key] = true;
        } else {
          this.toggle[key] = false;
        }
      }
    },
    submit() {
      if(this.$refs.form.validate()) {
        this.loading = true;
        const project = {
          order: this.post.order,
          title: this.post.title,
          category: this.post.category.toLowerCase(),
          content: this.post.content
        }
        db.collection('projekty').add(project).then(() => {
          this.dialog = false;
          this.loading = false;
        }).catch(() => {       
          return alert('Coś poszło nie tak');
        });
      }
    },
    submitEdit() {
      if(this.$refs.form.validate()) {

        if(this.editPost.category == 'ilustracje') {
          if(this.editPost.order != this.order) {
            const diff = this.editPost.order - this.order;
            this.ilustracje.forEach(el => {
              if(diff > 0) {
                if(this.order + diff >= el.order && el.order > this.order) {
                  el.order -= 1;
                }
              } else if(diff < 0) {
                if(this.order + diff <= el.order && el.order < this.order) {
                  el.order += 1;
                }
              }
            });   
          }
          this.ilustracje.forEach(element => {
            if(element.dataId == this.editPost.dataId) {
              element.order = parseInt(this.editPost.order);
              element.title = this.editPost.title;
              element.content = this.editPost.content;
            }
          });
        }
        if(this.editPost.category == 'design') {
          if(this.editPost.order != this.order) {
            const diff = this.editPost.order - this.order;
            this.design.forEach(el => {
              if(diff > 0) {
                if(this.order + diff >= el.order && el.order > this.order) {
                  el.order -= 1;
                }
              } else if(diff < 0) {
                if(this.order + diff <= el.order && el.order < this.order) {
                  el.order += 1;
                }
              }
            });   
          }
          this.design.forEach(element => {
            if(element.dataId == this.editPost.dataId) {
              element.order = this.editPost.order;
              element.title = this.editPost.title;
              element.content = this.editPost.content;
            }
          });
        }
        if(this.editPost.category == 'inne') {
          if(this.editPost.order != this.order) {
            const diff = this.editPost.order - this.order;
            this.inne.forEach(el => {
              if(diff > 0) {
                if(this.order + diff >= el.order && el.order > this.order) {
                  el.order -= 1;
                }
              } else if(diff < 0) {
                if(this.order + diff <= el.order && el.order < this.order) {
                  el.order += 1;
                }
              }
            });   
          }
          this.inne.forEach(element => {
            if(element.dataId == this.editPost.dataId) {
              element.order = this.editPost.order;
              element.title = this.editPost.title;
              element.content = this.editPost.content;
            }
          });
        }
        this.edit = false;
      }
    },
    submitEditLogo() {
      if(this.$refs.formLogo.validate()) {
        this.logo.imageUrl = this.editLogo.imageUrl;
        this.logo.image = this.editLogo.image;

        this.editLogoDialog = false;
      }
    },
    submitEditAbout() {
      if(this.$refs.formAbout.validate()) {
        this.about.title = this.editAbout.title;
        this.about.content = this.editAbout.content;
        this.about.imageUrl = this.editAbout.imageUrl;
        this.about.image = this.editAbout.image;

        this.editAboutDialog = false;
      }
    },
    onEdit(item) {
      this.order = item.order;
      this.editPost.order = item.order;
      this.editPost.category = item.category;
      this.editPost.dataId = item.dataId;
      this.editPost.title = item.title;
      this.editPost.content = item.content;
      this.editPost.imageUrl = item.imageUrl;
      this.editPost.image = null;
      this.edit = true;
    },
    onAboutEdit(item) {
      this.editAbout.category = item.category;
      this.editAbout.title = item.title;
      this.editAbout.content = item.content;
      this.editAbout.imageUrl = item.imageUrl;
      this.editAbout.image = null;
      this.editAboutDialog = true;
    },
    onLogoEdit(item) {
      this.editLogo.category = item.category;
      this.editLogo.imageUrl = item.imageUrl;
      this.editLogo.image = null;
      this.editLogoDialog = true;
    },    
    onPickFile() {
      this.$refs.fileInput.click();
    },
    onFileSelected(event) {
      const file = event;
      let fileName = file.name;
      if(fileName.lastIndexOf('.') <= 0) {
        return alert('Dodaj poprawny plik!')
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.post.imageUrl = fileReader.result;
      })
      fileReader.readAsDataURL(file);
      this.post.image = file;
    },
    onAboutEditFile(event) {
      const file = event;
      let fileName = file.name;
      if(fileName.lastIndexOf('.') <= 0) {
        return alert('Dodaj poprawny plik!')
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.editAbout.imageUrl = fileReader.result;
      })
      fileReader.readAsDataURL(file);
      this.editAbout.image = file;
    },
    onLogoEditFile(event) {
      const file = event;
      let fileName = file.name;
      if(fileName.lastIndexOf('.') <= 0) {
        return alert('Dodaj poprawny plik!')
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.editLogo.imageUrl = fileReader.result;
      })
      fileReader.readAsDataURL(file);
      this.editLogo.image = file;
    },
    onDeleteIlustracje(index) {
      this.$delete(this.ilustracje, index);
    },
    onDeleteDesign(index) {
      this.$delete(this.design, index);
    },
    onDeleteInne(index) {
      this.$delete(this.inne, index);
    },
    onSelectCategory() {
      if(this.post.category.toLowerCase() == 'ilustracje'){
        this.post.order = this.ilustracje.length + 1;
      }
      if(this.post.category.toLowerCase() == 'design'){
        this.post.order = this.design.length + 1;
      }
      if(this.post.category.toLowerCase() == 'inne'){
        this.post.order = this.inne.length + 1;
      }
    }
  },
  created() {
    db.collection('projekty').onSnapshot(response => {
      const changes = response.docChanges();
      changes.forEach(change => {
        if(change.type === 'added'){
          if(change.doc.data().category == 'ilustracje') {
            this.ilustracje.push({
              ...change.doc.data(),
              dataId: change.doc.id,
              imageUrl: require('@/assets/luca.png')
            });          
          }
          if(change.doc.data().category == 'design') {
            this.design.push({
              ...change.doc.data(),
              dataId: change.doc.id,
              imageUrl: require('@/assets/luca.png')
            });          
          }
          if(change.doc.data().category == 'inne') {
            this.inne.push({
              ...change.doc.data(),
              dataId: change.doc.id,
              imageUrl: require('@/assets/luca.png')
            });          
          }
        }
      });
    });
  }
}
</script>

<style>
  .v-card__text {
    padding-top: 0;
    margin-top: -41px;
  }
  .v-card__actions {
    padding-bottom: 0;
    padding-top: 0;
  }
  .edit-btn {
    border: 2px solid rgba(14, 79, 165, 0.65);
  }
  .remove-btn {
    border: 2px solid rgba(255, 2, 2, 0.65);
  }
  .form-title {
    margin-bottom: 30px;
  }
  .selected-img {
    border: 2px solid black;
    background: rgb(219, 216, 216);
    max-width: 300px;
    margin: auto;
    display: flex;
  }
  .form-submit {
    text-align: right;
  }
  .form-content {
    padding-left: 60px;
    padding-right: 60px;
  }
  .display-card {
    display: inline-block;
  }
  .display-img {
    width: 100%;
    height: 100%;
  }
  #add-btn {
    position: fixed;
    bottom: 0;
    right: 0;
    margin-bottom: 10px;
    margin-right: 5px;
  }
  #section-nav {
    border-top: 2px solid rgb(12, 56, 12);
  }
  p.title, .form-title {
    text-align: center;
  }
  #login-alert {
    text-align: center;
    display: none;
  }
  .active {
    background: rgb(3, 144, 3);
  }

</style>