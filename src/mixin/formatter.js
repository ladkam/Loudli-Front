export const formatter = {
    methods: {

        numberWithSpaces(x) {
            return Math.round(x).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        },

        checkToken: function(token,tokenExp){

            if ((token && tokenExp*1000>Date.now()+90000))
            {
                return true
            }
            else
                return false
        },
        convert2Date(DateToFormat) {
            let d = new Date(DateToFormat.split(".")[0].replace("T", " "))
            let today = new Date();
            if(d.getDate()==today.getDate())
            {
                return d.getHours() +':'+ d.getMinutes().toString()
            }
            else
                return d.getDay()+'-'+d.getMonth()+'-'+d.getFullYear()
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