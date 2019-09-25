<template>
  <div class="contact fill-height">

    <!-- contact view -->
    <div class="fill-height" v-if="true">
      <div class="display-content fill-height">
        
        <!-- email form -->
        <div class="email-content">
          <v-form id="email-form">
            <!-- email input -->
            <v-text-field 
              type="email"
              label="E-mail"
              filled
              v-model="email.email"
              required></v-text-field>
            <!-- message input -->
            <v-textarea
              filled
              label="Message"
              v-model="email.message"
              required></v-textarea>
            <v-btn 
              class="send-email"
              text
              @click="sendMail()">Send</v-btn>
          </v-form>
        </div>

        <!-- text info -->
        <div class="contact-content">
          <div>
            <h2 class="display-1 pb-12">Contact</h2>
            <div class="body-1">
              <p class="contact-text-content">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque eum doloribus est quos dolorum. Placeat, molestiae perferendis nulla corporis porro blanditiis pariatur possimus, at debitis dolorem libero magnam mollitia voluptate?</p>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      email: {
        name: '',
        subject: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    sendMail() {
      
    }
  }
}
</script>

<style>
  /* text styling */
  .contact-text-content {
    padding-top: 5px;
    padding-bottom: 38px;
    white-space: pre-wrap;
  } 

  /* position and color styling */ 
  .email-content {
    float: left;
    width: 48%;
    height: 100%;
  }
  .contact-content {
    background: rgb(13, 56, 86);
    color: white;
    padding-top: 67px;
    padding-left: 10vw;
    padding-right: 10vw;
    min-height: 100%;
    float: right;
    width: 52%;
    display: flex;
    flex-direction: column;
  }

  /* email form inputs styling */
  #email-form {
    padding-top: 67px;
    padding-left: 10vw;
    padding-right: 10vw;
  }
  .send-email {
    background: peru;
    float: right;
  }

  /* smaller size screens */
  @media only screen and (max-width: 960px) {
    .email-content {
      width: 100%;
      height: auto;
      float: none;
      padding-bottom: 19px;
    }
    .display-content .email-content {
      order: 2;
    }
    .display-content .contact-content {
      order: 1;
    }
    #email-form {
      padding-left: 90px;
      padding-right: 90px;
    }
    .contact-content {
      padding-left: 90px;
      padding-right: 90px;
      min-height: auto;
      width: 100%;
      height: auto;
      float: none;
    }
  }

  /* mobile size screens */
  @media only screen and (max-width: 600px) {
    .contact-content {
      padding-left: 48px;
      padding-right: 48px;
    }
    #email-form {
      padding-left: 48px;
      padding-right: 48px;
    }
  }
</style>