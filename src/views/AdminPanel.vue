<template>
  <div class="admin">

    <!-- login alert -->
    <div id="login-alert">
      <p class="pink--text font-weight-medium">Nie jesteś zalogowany</p>
      <v-btn class="indigo lighten-3">Zaloguj</v-btn>
    </div>

    <!-- navigation through sections -->
    <nav id="section-nav">
      <v-toolbar class="green" dense flat>
        <div>
          <v-btn tile text class="nav-btn mx-2">Ilustracje</v-btn>
        </div>
        <div>
          <v-btn tile text class="nav-btn mx-2">Design</v-btn>
        </div>
        <div>
          <v-btn tile text class="nav-btn mx-2">Inne</v-btn>
        </div>
        <div>
          <v-btn tile text class="nav-btn mx-2">O mnie</v-btn>
        </div>
        <div>
          <v-btn tile text class="nav-btn mx-2">Logo</v-btn>
        </div>          
      </v-toolbar>
    </nav>

    <!-- ilustracje -->
    <v-content>
      <v-container>
        <div class="d-flex justify-space-around flex-wrap" id="ilust-section">
          <v-card class="display-card my-4" min-height="293px" min-width="220px" max-width="25vw">
            <v-img class="display-img" src="..\assets\luca.png">
              <v-card-title class="justify-space-between">
                <v-btn x-small fab><v-icon>mdi-pen</v-icon></v-btn>
                <v-btn x-small fab><v-icon>mdi-delete</v-icon></v-btn>
              </v-card-title>
            </v-img>
          </v-card>
          <v-card class="display-card my-4" min-height="293px" min-width="220px" max-width="25vw">
            <v-img class="display-img" src="..\assets\sparrow.jpg"></v-img>
          </v-card>
          <v-card class="display-card my-4" min-height="293px" min-width="220px" max-width="25vw">
            <v-img class="display-img" src="..\assets\sparrow.jpg"></v-img>
          </v-card>
          <v-card class="display-card my-4" min-height="293px" min-width="220px" max-width="25vw">
            <v-img class="display-img" src="..\assets\sparrow.jpg"></v-img>
          </v-card>     
          <v-card class="display-card my-4" min-height="293px" min-width="220px" max-width="25vw">
            <v-img class="display-img" src="..\assets\fox.png"></v-img>
          </v-card>                
        </div>       
      </v-container>
     
    </v-content>




    <!-- button to add new content -->
    <div id="add-btn">
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" fab dark color="indigo"><v-icon>mdi-plus</v-icon></v-btn> 
        </template>
        <span>Dodaj post</span>          
      </v-tooltip>
          
    </div>  





  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  }  
}
</script>

<style>
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


</style>