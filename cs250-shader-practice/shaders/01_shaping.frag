#version 300 es
precision mediump float;

/**
 * \file
 * \author Seunghyeon Song
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */

 out vec4 FragColor;

 uniform vec2 u_resolution;
 uniform float u_time;

 float plot(vec2 st, float pct){
    return smoothstep(pct - 0.02, pct, st.y) -
           smoothstep(pct, pct + 0.02, st.y);
 }

 void main()
 {
    // gl_FragCoord = pixel coordinate or position.
    vec2 st = gl_FragCoord.xy / u_resolution;

    // float y = pow(st.x, 5.0);
    // step = only 0 or 1
    // smooth step = give a smooth line between range
    // color = (1.0 - pct) * color * pct * vec3(0, 1.0, 0); 

    float test = (sin(u_time) / 2.0  + 0.5);
    float max_range = 3.0;

    vec3 color = vec3(1);

    for(float f = 0; f < max_range; ++i){
        float y_n = sqrt(i * 0.1 - pow(st.x, 2.0));
        vec3 color_n = vec3(y_n);
        float pct_n = plot(st, y_n);
        color_n = (1.0 - pct_n) * color_n + pct_n * vec3(0, 0, sin(u_time));

        color = mix(color, color_n, 0.5);
    }

    FragColor = vec4(color, 1.0);
 }