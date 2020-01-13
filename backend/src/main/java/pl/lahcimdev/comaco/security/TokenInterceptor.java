package pl.lahcimdev.comaco.security;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
public class TokenInterceptor implements HandlerInterceptor {

    private JwtTokenService jwtTokenService = new JwtTokenService();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String token = request.getHeader("Authorization");

        if (token == null || !token.startsWith("Bearer ")) {
            return true;
        }

        String newToken = jwtTokenService.updateExpirationDateToken(token);

        response.setHeader("Authorization", newToken);
        response.setHeader("Access-control-expose-headers", "Authorization");

        return true;

    }
}
