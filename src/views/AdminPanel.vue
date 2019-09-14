<template>
  <div class="admin">

    <!-- login alert -->
    <div v-if="!logged" id="login-alert">
      <p class="pink--text font-weight-medium">Nie jesteś zalogowany</p>
      <v-form 
        v-if="typeof(login.email) == 'string' && typeof(login.password) == 'string'" 
        ref="login">
        <v-text-field
          type="email"
          filled
          placeholder="E-mail"
          prepend-icon="mdi-email-outline"
          v-model="login.email"
          :rules="inputRules"
          label="E-mail"
          required></v-text-field>
        <v-text-field
          type="password"
          filled
          placeholder="Password"
          prepend-icon="mdi-lock-outline"
          v-model="login.password"
          :rules="inputRules"
          label="Password"
          required></v-text-field>
      </v-form>
      <v-btn
        @click="onLogin()"
        class="indigo lighten-3">Zaloguj</v-btn>
    </div>

    <div v-if="logged">
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
                      :loading="whileProcessing"
                      @click="onDelete(item.dataId, item.extension, item.order, item.category)">
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
                      :loading="whileProcessing"
                      @click="onDelete(item.dataId, item.extension, item.order, item.category)">
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
                      :loading="whileProcessing"
                      @click="onDelete(item.dataId, item.extension, item.order, item.category)">
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
                :disabled="loading"
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
                :disabled="loadingEdit"
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
                        :loading="loadingEdit"
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
                :disabled="loadingEdit"
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
                        :loading="loadingEdit"
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
                :disabled="loadingEdit"
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
                        :loading="loadingEdit"
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
  </div>
</template>

<script>
import { db, st, auth } from '@/fb'

export default {
  data() {
    return {
      logged: false,
      login: {
        email: '',
        password: ''
      },
      loadingEdit: false,
      whileProcessing: false,
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
      about: {},
      logo: {},
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

        const filename = this.post.image.name;       
        const ext = filename.slice(filename.lastIndexOf('.'));
        
        // adding new post to db
        this.loading = true;
        const project = {
          order: this.post.order,
          title: this.post.title,
          category: this.post.category.toLowerCase(),
          content: this.post.content,
          extension: ext,
          imageUrl: ''
        }
        db.collection('projekty').add(project).then((ref) => {
          
          // adding image to st
          const stRef = st.ref();
          const metadata = this.post.image.type;
          const downloadURL = 'images/' + ref.id + ext;

          stRef.child(downloadURL).put(this.post.image, { 
            type: metadata
          }).then(() => {

            // get url of img and update it to db
            st.ref().child(downloadURL).getDownloadURL().then((response) => {
              db.collection('projekty').doc(ref.id).update({
                imageUrl: response
              }).then(() => {
                this.dialog = false;
                this.loading = false;            
              }).catch(() => {
                this.dialog = false;
                this.loading = false; 
                return alert('Coś poszło nie tak - błąd aktualizacji url');
              });
            });

          }).catch(() => {
            this.dialog = false;
            this.loading = false;
            return alert('Coś poszło nie tak - błąd wgrywania obrazu');
          });

        }).catch(() => {
          this.dialog = false;
          this.loading = false;   
          return alert('Coś poszło nie tak - błąd wysłania do bazy danych');
        });


      }
    },
    submitEdit() {
      // validate
      if(this.$refs.form.validate()) {
        // change order of all elements that should be updated
        this.loadingEdit = true;
        let changeOrder = [];
        if(this.editPost.category == 'ilustracje') {
          if(this.editPost.order != this.order) {
            const diff = this.editPost.order - this.order;
            this.ilustracje.forEach(el => {
              if(diff > 0) {
                if(this.order + diff >= el.order && el.order > this.order) {
                  el.order = parseInt(el.order - 1);
                  changeOrder.push({ order: el.order, dataId: el.dataId });
                }
              } else if(diff < 0) {
                if(this.order + diff <= el.order && el.order < this.order) {
                  el.order = parseInt(el.order + 1);
                  changeOrder.push({ order: el.order, dataId: el.dataId });
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
                  el.order = parseInt(el.order - 1);
                  changeOrder.push({ order: el.order, dataId: el.dataId });
                }
              } else if(diff < 0) {
                if(this.order + diff <= el.order && el.order < this.order) {
                  el.order = parseInt(el.order + 1);
                  changeOrder.push({ order: el.order, dataId: el.dataId });
                }
              }
            });   
          }
          this.design.forEach(element => {
            if(element.dataId == this.editPost.dataId) {
              element.order = parseInt(this.editPost.order);
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
                  el.order = parseInt(el.order - 1);
                  changeOrder.push({ order: el.order, dataId: el.dataId });
                }
              } else if(diff < 0) {
                if(this.order + diff <= el.order && el.order < this.order) {
                  el.order = parseInt(el.order + 1);
                  changeOrder.push({ order: el.order, dataId: el.dataId });
                }
              }
            });   
          }
          this.inne.forEach(element => {
            if(element.dataId == this.editPost.dataId) {
              element.order = parseInt(this.editPost.order);
              element.title = this.editPost.title;
              element.content = this.editPost.content;
            }
          });
        }

      const up = {
        order: parseInt(this.editPost.order),
        title: this.editPost.title,
        content: this.editPost.content,
        category: this.editPost.category
      }

      // update one post data on firebase
      db.collection('projekty').doc(this.editPost.dataId).update(up).then(() => {
        
        // update all modified order properties on firebase
        changeOrder.forEach(el => {
          db.collection('projekty').doc(el.dataId).update({ 
            order: el.order 
          }).then(() => {
            this.edit = false;
            this.loadingEdit = false;
          }).catch((err) => {
            this.edit = false;
            this.loadingEdit = false;
            return alert('Coś poszło nie tak - błąd aktualizacji zmiany kolejności. ' + err);
          });
        });        
        if(changeOrder.length == 0) {
          this.loadingEdit = false;
          this.edit = false;
        }

      }).catch((err) => {
        this.loadingEdit = false;
        this.edit = false;
        return alert('Coś poszło nie tak - błąd aktualizacji edycji projektu. ' + err);
      })




      }
    },
    submitEditLogo() {
      if(this.$refs.formLogo.validate()) {

        this.loadingEdit = true;

        const filename = this.editLogo.image.name;
        const ext = filename.slice(filename.lastIndexOf('.'));
        const oldImg= 'logo/' + this.logo.dataId + this.logo.extension;
        const metadata = this.editLogo.image.type;


        // remove old image from st
        st.ref().child(oldImg).delete().then(() => {

          // add new image to st
          st.ref().child('logo/' + this.logo.dataId + ext).put(this.editLogo.image, {
            type: metadata
          }).then(() => {

            // get new image url
            st.ref().child('logo/' + this.logo.dataId + ext).getDownloadURL().then((res) => {

              // update image url on database
              db.collection('logo').doc(this.logo.dataId).update({
                extension: ext,
                imageUrl: res
              }).then(() => {
                this.loadingEdit = false;
                this.editLogoDialog = false;
              }).catch(() => {
                this.loadingEdit = false;
                this.editLogoDialog = false;
                return alert('Coś poszło nie tak - błąd aktualizacji url w bazie');
              });

            }).catch(() => {
              this.loadingEdit = false;
              this.editLogoDialog = false;
              return alert('Coś poszło nie tak - błąd wczytywania url nowego obrazu');
            });

          }).catch(() => {
            this.loadingEdit = false;
            this.editLogoDialog = false;
            return alert('Coś poszło nie tak - błąd wgrywania nowego obrazu');
          });

        }).catch(() => {
          this.loadingEdit = false;
          this.editLogoDialog = false;
          return alert('Coś poszło nie tak - błąd usuwania starego obrazu');
        });

        this.logo.imageUrl = this.editLogo.imageUrl;
        this.logo.image = this.editLogo.image;  
      }
    },
    submitEditAbout() {
      if(this.$refs.formAbout.validate()) {

        this.loadingEdit = true;

        const newAbout = {
          title: this.editAbout.title,
          content: this.editAbout.content
        }

        // update data on db
        db.collection('about').doc(this.about.dataId).update(newAbout).then(() => {

          // if image was changed
          if(this.editAbout.image != null) {

            const oldImg= 'about/' + this.about.dataId + this.about.extension;
            const metadata = this.editAbout.image.type;
            const filename = this.editAbout.image.name;
            const ext = filename.slice(filename.lastIndexOf('.'));

            // remove old image from st
            st.ref().child(oldImg).delete().then(() => {

              // add new image to st
              st.ref().child('about/' + this.about.dataId + ext).put(this.editAbout.image, {
                type: metadata
              }).then(() => {

                // get new image url
                st.ref().child('about/' + this.about.dataId + ext).getDownloadURL().then((res) => {

                  // update image url on database
                  db.collection('about').doc(this.about.dataId).update({
                    extension: ext,
                    imageUrl: res
                  }).then(() => {
                    this.loadingEdit = false;
                    this.editAboutDialog = false;
                  }).catch(() => {
                    this.loadingEdit = false;
                    this.editAboutDialog = false;
                    return alert('Coś poszło nie tak - błąd aktualizacji url w bazie');
                  });

                }).catch(() => {
                  this.loadingEdit = false;
                  this.editAboutDialog = false;
                  return alert('Coś poszło nie tak - błąd wczytywania url nowego obrazu');
                });

              }).catch(() => {
                this.loadingEdit = false;
                this.editAboutDialog = false;
                return alert('Coś poszło nie tak - błąd wgrywania nowego obrazu');
              });

            }).catch(() => {
              this.loadingEdit = false;
              this.editAboutDialog = false;
              return alert('Coś poszło nie tak - błąd usuwania starego obrazu');
            });

          } else {
            this.loadingEdit = false;
            this.editAboutDialog = false;
          }

        }).catch(() => {
          this.loadingEdit = false;
          this.editAboutDialog = false;
          return alert('Coś poszło nie tak - błąd aktualizacji treści w bazie');
        });
  
        this.about.title = this.editAbout.title;
        this.about.content = this.editAbout.content;
        this.about.imageUrl = this.editAbout.imageUrl;
        this.about.image = this.editAbout.image;
      }
    },
    onLogin() {
      // validate
      if(this.$refs.login.validate()) {
        auth.signInWithEmailAndPassword(this.login.email, this.login.password).then(() => {
          this.logged = true;
        }).catch(() => {
          return alert('Błąd logowania');
        });
      }
    },
    onEdit(item) {
      this.order = parseInt(item.order);
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
      const fileName = file.name;
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
    onDelete(id, ext, order, category) {

      // remove item from db
      const delOrder = order;
      db.collection('projekty').doc(id).delete().then(() => {
        
        // update order property of remaining projects
        let changeOrder = [];
        if(category == 'ilustracje') {
          if(delOrder != this.ilustracje.length +1) {
            this.ilustracje.forEach(el => {
              if(el.order > delOrder) {
                el.order = parseInt(el.order - 1);
                changeOrder.push({ order: el.order, dataId: el.dataId });
              }
            });   
          }
        } else if(category == 'design') {
          if(delOrder != this.design.length + 1) {
            this.design.forEach(el => {
              if(el.order > delOrder) {
                el.order = parseInt(el.order - 1);
                changeOrder.push({ order: el.order, dataId: el.dataId });
              }
            });   
          }
        } else if(category == 'inne') {
          if(delOrder != this.inne.length + 1) {
            this.inne.forEach(el => {
              if(el.order > delOrder) {
                el.order = parseInt(el.order - 1);
                changeOrder.push({ order: el.order, dataId: el.dataId });
              }
            });   
          }
        }

        // disable remove delete button to prevent spam clicks
        this.whileProcessing = true;

        // remove corresponding image
        const downloadURL = 'images/' + id + ext;
        st.ref().child(downloadURL).delete().then(() => {
          
          // push changes of order to db
          changeOrder.forEach(el => {
            db.collection('projekty').doc(el.dataId).update({
              order: el.order
            }).then(() => {
              this.whileProcessing = false;
            }).catch(() => {
              this.whileProcessing = false;
              return alert('Coś poszło nie tak - błąd aktualizacji kolejności pozostałych projektów');
          });

        });        
        }).catch(() => {
          this.whileProcessing = false;      
          return alert('Coś poszło nie tak - błąd usuwania obrazu');
        });

        if(changeOrder.length == 0) {
          this.whileProcessing = false;
        }
      }).catch(() => {
        this.whileProcessing = false;
        return alert('Coś poszło nie tak - błąd usuwania projektu.');
      })
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
    // check if admin is logged in
    auth.onAuthStateChanged((user) => {
      if(user) {
        this.ilustracje = [];
        this.design = [];
        this.inne = [];
        this.logo = {};
        this.about = {};
        // getting projects from db
        db.collection('projekty').orderBy('order').onSnapshot(response => {
          const changes = response.docChanges();
          changes.forEach(change => {
            if(change.type === 'added'){
              if(change.doc.data().category == 'ilustracje') {
                this.ilustracje.push({
                  ...change.doc.data(),
                  dataId: change.doc.id
                });
              }
              if(change.doc.data().category == 'design') {
                this.design.push({
                  ...change.doc.data(),
                  dataId: change.doc.id
                });          
              }
              if(change.doc.data().category == 'inne') {
                this.inne.push({
                  ...change.doc.data(),
                  dataId: change.doc.id
                });          
              }
            } else if(change.type === 'removed') {
              if(change.doc.data().category == 'ilustracje') {
                this.ilustracje.forEach((item, index) => {
                  if(item.dataId == change.doc.id) {
                    this.ilustracje.splice(index, 1);
                  }
                });
              }
              if(change.doc.data().category == 'design') {
                this.design.forEach((item, index) => {
                  if(item.dataId == change.doc.id) {
                    this.design.splice(index, 1);
                  }
                });
              }
              if(change.doc.data().category == 'inne') {
                this.inne.forEach((item, index) => {
                  if(item.dataId == change.doc.id) {
                    this.inne.splice(index, 1);
                  }
                });
              }
            } else if(change.type === 'modified') {
              // update img url
              if(change.doc.data().category == 'ilustracje') {
                this.ilustracje.forEach(item => {
                  if(change.doc.id == item.dataId) {
                    item.imageUrl = change.doc.data().imageUrl;
                  }
                });          
              } else if(change.doc.data().category == 'design') {
                this.design.forEach(item => {
                  if(change.doc.id == item.dataId) {
                    item.imageUrl = change.doc.data().imageUrl;
                  }
                });
              } else if(change.doc.data().category == 'inne') {
                this.inne.forEach(item => {
                  if(change.doc.id == item.dataId) {
                    item.imageUrl = change.doc.data().imageUrl;
                  }
                });            
              }
            }
          });
        });

        // getting logo from db
        db.collection('logo').onSnapshot(response => {
          const changes = response.docChanges();
          changes.forEach(change => {
            this.logo = { 
              ...change.doc.data(),
              dataId: change.doc.id
            }
          });
        });

        // getting about info from db
        db.collection('about').onSnapshot(response => {
          const changes = response.docChanges();
          changes.forEach(change => {
            this.about = { 
              ...change.doc.data(),
              dataId: change.doc.id
            }
          });
        });

        this.logged = true;
      } else {
        this.ilustracje = [];
        this.design = [];
        this.inne = [];
        this.logo = {};
        this.about = {};
        
        this.logged = false;
      }
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
    background: rgba(255, 2, 2, 0.65);
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
    padding-top: 20vh;
    text-align: center;
    width: 50%;
    margin: auto;
  }
  .active {
    background: rgb(3, 144, 3);
  }

  @media only screen and (max-width: 600px) {
    #login-alert {
      width: 100%;
      padding-left: 10px;
      padding-right: 10px;
    }
  }

</style>