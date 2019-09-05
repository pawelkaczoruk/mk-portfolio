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
            <v-card class="display-card my-4 mx-2" height="320px" width="230px">
              <v-img class="display-img" :src="item.source">
                <v-card-title class="justify-space-between">
                  <v-btn x-small fab><v-icon>mdi-pencil-outline</v-icon></v-btn>
                  <v-btn x-small fab><v-icon>mdi-trash-can-outline</v-icon></v-btn>
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
            <v-card class="display-card my-4 mx-2" height="320px" width="230px">
              <v-img class="display-img" :src="item.source">
                <v-card-title class="justify-space-between">
                  <v-btn x-small fab><v-icon>mdi-pencil-outline</v-icon></v-btn>
                  <v-btn x-small fab><v-icon>mdi-trash-can-outline</v-icon></v-btn>
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
            <v-card class="display-card my-4 mx-2" height="320px" width="230px">
              <v-img class="display-img" :src="item.source">
                <v-card-title class="justify-space-between">
                  <v-btn x-small fab><v-icon>mdi-pencil-outline</v-icon></v-btn>
                  <v-btn x-small fab><v-icon>mdi-trash-can-outline</v-icon></v-btn>
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
            <v-card class="display-card my-4 mx-2" height="320px" width="230px">
              <v-img class="display-img" :src="about.source">
                <v-card-title class="justify-space-between">
                  <v-btn x-small fab><v-icon>mdi-pencil-outline</v-icon></v-btn>
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
            <v-card class="display-card my-4 mx-2" height="300px" width="300px">
              <v-img class="display-img" :src="logo.source">
                <v-card-title class="justify-space-between">
                  <v-btn x-small fab><v-icon>mdi-pencil-outline</v-icon></v-btn>
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
      <div class="yellow">
        <v-card>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn
              small
              fab
              text
              @click="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
          </v-card-actions>
          <v-card-text>
            <!-- form -->
            <h2 class="text-center display-1">Dodaj nowy post</h2>
            <v-container class="form-content">
              <v-content>
                <v-form ref="form">
                  <v-row>
                    <v-col sm="7">
                      <v-row></v-row>
                      <v-row></v-row>
                      <v-row></v-row>
                    </v-col>
                    <v-col sm=5>

                    </v-col>
                  </v-row>

                  <div class=selected-img><v-img 
                    :src="post.imageUrl" 
                    width="100px"
                    height="150px"></v-img></div>
                  <v-file-input
                    class="form-file"
                    label="Plik"
                    ref="fileInput"
                    type="file"
                    required
                    @change="onFileSelected"></v-file-input>
                  <v-select 
                    prepend-icon="mdi-file-document-box-outline"
                    filled
                    class="form-select" 
                    :items="categories" 
                    label="Kategoria"
                    v-model="post.category"
                    :rules="inputRules"
                    required></v-select>
                  <v-text-field 
                    class="form-title"
                    prepend-icon="mdi-fountain-pen-tip"
                    filled
                    label="Tytuł"
                    v-model="post.title"
                    :rules="inputRules"
                    required></v-text-field>
                  <v-textarea
                    class="form-textarea"
                    prepend-icon="mdi-subtitles-outline"
                    filled
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        file: '',
        category: '',
        title: '',
        content: '',
        imageUrl: '',
        image: null
      },
      inputRules: [
        v => v.length >= 1 || 'Uzupełnij pole'
      ],
      categories: ['Ilustracje', 'Design', 'Inne'],
      dialog: false,
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
        { title: 'test title 1', content: 'test content', source: require('@/assets/fox.png') },
        { title: 'test title 1', content: 'test content', source: require('@/assets/sparrow.jpg') },
        { title: 'test title 1', content: 'test content', source: require('@/assets/fight.png') },
        { title: 'test title 1', content: 'test content', source: require('@/assets/courage.png') },
        { title: 'test title 1', content: 'test content', source: require('@/assets/luca.png') }
      ],
      design: [
        { title: 'test title 1', content: 'test content', source: require('@/assets/courage.png') },
        { title: 'test title 1', content: 'test content', source: require('@/assets/sparrow.jpg') },
        { title: 'test title 1', content: 'test content', source: require('@/assets/luca.png') },
        { title: 'test title 1', content: 'test content', source: require('@/assets/fight.png') },
        { title: 'test title 1', content: 'test content', source: require('@/assets/fox.png') }
      ],
      inne: [
        { title: 'test title 1', content: 'test content', source: require('@/assets/sparrow.jpg') },
        { title: 'test title 1', content: 'test content', source: require('@/assets/luca.png') },
        { title: 'test title 1', content: 'test content', source: require('@/assets/courage.png') },
        { title: 'test title 1', content: 'test content', source: require('@/assets/fox.png') },
        { title: 'test title 1', content: 'test content', source: require('@/assets/fight.png') }
      ],
      about: { title: 'about me', content: 'test content', source: require('@/assets/me.jpg') },
      logo: { title: 'logo', source: require('@/assets/me.jpg') }
    }
  },
  methods: {
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
        console.log(this.post.title, this.post.content, this.post.category);
        this.dialog = false;
      }
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
    }
  }
}
</script>

<style>
  .selected-img {
    border: 1px solid black;
    display:flex;
  }
  .form-submit {
    text-align:right;
  }
  .form-textarea {
    width: 100%;
  }
  .form-file, .form-select, .form-title {
    width: 60%;
  }
  .form-content {
    padding-left:60px;
    padding-right:60px;
  }
  .display-card {
    display:inline-block;
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
  p.title {
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