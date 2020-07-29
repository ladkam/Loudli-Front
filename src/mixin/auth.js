export const formatter = {
    methods: {

        numberWithSpaces(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        },

        checkToken: function(token,tokenExp){

            if ((token && tokenExp*1000>Date.now()+90000))
            {
                return true
            }
            else
                return false
        },

        checkRefreshToken: function(refreshToken,refreshTokenExp){


            if ((refreshToken && refreshTokenExp>Date.now()+300000))
            {
                return true
            }
            else
                return false
        }
    }
}