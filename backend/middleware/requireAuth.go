package middleware

import (
	"net/http"
	"os"
	"time"

	"github.com/FredDude2004/myrepertoire/backend/config"
	"github.com/FredDude2004/myrepertoire/backend/models"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func RequireAuth(c *gin.Context) {
	// Get the cookie off req
	tokenString, err := c.Cookie("Authorization")
	if err != nil {
		c.AbortWithStatus(http.StatusUnauthorized)
	}

	// Decode/validate it
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (any, error) {
		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return []byte(os.Getenv("SECRET")), nil
	}, jwt.WithValidMethods([]string{jwt.SigningMethodHS256.Alg()}))
	if err != nil || token == nil {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	if claims, ok := token.Claims.(jwt.MapClaims); ok {
		// Check the exp
		if float64(time.Now().Unix()) > claims["exp"].(float64) {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		// Find the user with token sub
		var user models.User
		config.DB.First(&user, claims["sub"])
		if user.ID == 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		// Attack to req
		c.Set("user", user)

		// Continue
		c.Next()

	} else {
		c.AbortWithStatus(http.StatusUnauthorized)
	}
}
