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
                    fab>
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
                    fab>
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
                    fab>
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
              width="302px">
              <v-img 
                elevation="3" 
                tile 
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
      full-width 
      persistent 
      no-click-animation>
      <template v-slot:activator="{ on }">
        <!-- button to add new content -->
        <div id="add-btn">
          <v-btn
            v-on="on" 
            @click="dialog != dialog" 
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
                          required></v-select>                        
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
    <v-dialog v-model="edit">
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
                      @click="submit()">Zapisz</v-btn>
                  </div>        
                </v-form>               
              </v-content>             
            </v-container>       
          </v-card-text>
        </v-card>
      </div>
    </v-dialog>

    <!-- edit about section -->
    <v-dialog v-model="editAboutDialog">
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
                          :rules="inputFileRules"
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
    <v-dialog v-model="editLogoDialog">
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
                          :rules="inputFileRules"
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
export default {
  data() {
    return {
      post: {
        category: '',
        title: '',
        content: '',
        imageUrl: '',
        image: null
      },
      editPost: {
        category: '',
        title: '',
        content: '',
        imageUrl: '',
        image: null
      },
      editAbout: { 
        title: '', 
        content: '', 
        imageUrl: '' ,
        image: null
      },
      editLogo: { 
        imageUrl: '',
        image: null
      },      
      inputRules: [
        v => v.length >= 1 || 'Uzupełnij pole'
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
      ilustracje: [
        { category: 'ilustracje', val: 1, title: 'test title 1', content: 'test content', imageUrl: require('@/assets/fox.png') },
        { category: 'ilustracje', val: 2, title: 'test title 2', content: 'test content', imageUrl: require('@/assets/sparrow.jpg') },
        { category: 'ilustracje', val: 3, title: 'test title 3', content: 'test content', imageUrl: require('@/assets/fight.png') },
        { category: 'ilustracje', val: 4, title: 'test title 4', content: 'test content', imageUrl: require('@/assets/courage.png') },
        { category: 'ilustracje', val: 5, title: 'test title 5', content: 'test content', imageUrl: require('@/assets/luca.png') }
      ],
      design: [
        { category: 'design', val: 1, title: 'test title 1', content: 'test content', imageUrl: require('@/assets/courage.png') },
        { category: 'design', val: 2, title: 'test title 1', content: 'test content', imageUrl: require('@/assets/sparrow.jpg') },
        { category: 'design', val: 3, title: 'test title 1', content: 'test content', imageUrl: require('@/assets/luca.png') },
        { category: 'design', val: 4, title: 'test title 1', content: 'test content', imageUrl: require('@/assets/fight.png') },
        { category: 'design', val: 5, title: 'test title 1', content: 'test content', imageUrl: require('@/assets/fox.png') }
      ],
      inne: [
        { category: 'inne', val: 1, title: 'test title 1', content: 'test content', imageUrl: require('@/assets/sparrow.jpg') },
        { category: 'inne', val: 2, title: 'test title 1', content: 'test content', imageUrl: require('@/assets/luca.png') },
        { category: 'inne', val: 3, title: 'test title 1', content: 'test content', imageUrl: require('@/assets/courage.png') },
        { category: 'inne', val: 4, title: 'test title 1', content: 'test content', imageUrl: require('@/assets/fox.png') },
        { category: 'inne', val: 5, title: 'test title 1', content: 'test content', imageUrl: require('@/assets/fight.png') }
      ],
      about: { category: 'about', title: 'About me', content: 'test content', imageUrl: require('@/assets/me.jpg') },
      logo: { category: 'logo', imageUrl: require('@/assets/logo.jpg') }
    }
  },
  methods: {
    clear() {
      this.post.category = '';
      this.post.title = '';
      this.post.content = '';
      this.post.imageUrl = '';
      this.post.image = null;
    },
    show(section) {
      for(var key in this.toggle) {
        if(key === section) {
          this.toggle[key] = true;
        } else {
          this.toggle[key] = false;
        }
      }
    },
    submit() {
      if(this.$refs.form.validate()) {
        this.dialog = false;
      }
    },
    submitEditLogo() {
      if(this.$refs.formLogo.validate()) {
        this.editLogoDialog = false;
      }
    },
    submitEditAbout() {
      if(this.$refs.formAbout.validate()) {
        this.editAboutDialog = false;
      }
    },
    onEdit(item) {
      this.editPost.category = item.category;
      this.editPost.title = item.title;
      this.editPost.content = item.content;
      this.editPost.imageUrl = item.imageUrl;
      this.editPost.image = null;
      this.edit = true;
    },
    onAboutEdit(item) {
      this.editAbout.title = item.title;
      this.editAbout.content = item.content;
      this.editAbout.imageUrl = item.imageUrl;
      this.editAbout.image = null;
      this.editAboutDialog = true;
    },
    onLogoEdit(item) {
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
      this.image = file;
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
      this.image = file;
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
      this.image = file;
    }
  }
}
</script>

<style>
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