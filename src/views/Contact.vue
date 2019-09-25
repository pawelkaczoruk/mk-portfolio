<template>
  <div class="contact fill-height">

    <!-- contact view -->
    <div class="fill-height">
      <div class="display-content fill-height">
        
        <!-- email form -->
        <div class="email-content">
          <v-form id="email-form" ref="formEmail">
            <!-- email input -->
            <v-text-field 
              type="email"
              label="E-mail"
              :rules="emailRules"
              filled
              v-model="email.email"
              required></v-text-field>
            <!-- message input -->
            <v-textarea
              filled
              :rules="messageRules"
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
          <div v-if="Object.keys(info).length != 0">
            <h2 class="display-1 pb-12">{{ info.title }}</h2>
            <div class="body-1">
              <p class="contact-text-content">{{ info.content }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import { db } from '@/fb'

export default {
  data() {
    return {
      info: {},
      email: {
        email: '',
        message: ''
      },
      messageRules: [
        v => v.length >= 1 || 'Message is required'
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
    }
  },
  methods: {
    sendMail() {
      if(this.$refs.formEmail.validate()) {
        console.log('test')
      }
    }
  },
  created() {
    // Loading contact info from db  
    db.collection('contact').onSnapshot(response => {
      const changes = response.docChanges();
      changes.forEach(change => {
        if(change.type === 'added'){
          if(change.doc.data().category == 'contact') {
            this.info = change.doc.data();
          }
        }
      });
    });
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