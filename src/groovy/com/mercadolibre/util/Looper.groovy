package com.mercadolibre.util

class Looper {
   private def code

   static Looper loop( code ) {
      new Looper(code:code)
   }

   void until( test ) {
      code()
      while (!test()) {
         code()
      }
   }
}
