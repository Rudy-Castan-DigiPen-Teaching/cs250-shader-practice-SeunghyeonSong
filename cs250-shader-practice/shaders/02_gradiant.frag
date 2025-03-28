#version 300 es
precision mediump float;

/**
 * \file 02_gradiant
 * \author Seunghyeon Song
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

out vec4 FragColor;

float plot (vec2 st, float pct){
  return  smoothstep( pct-0.01, pct, st.y) -
          smoothstep( pct, pct+0.01, st.y);
}

//circle
vec2 center_of_circle = vec2(0.5);

// I get a reference from here.
// https://www.youtube.com/watch?v=WyDnTO9KkrU;
float circle_check(float radius, vec2 pixel_position){
    // get pixel position's range from center of 
    float square_distance = pow(center_of_circle.x - pixel_position.x, 2.0) + 
                            pow(center_of_circle.y - pixel_position.y, 2.0);
    return step(square_distance, pow(radius, 2.0));
}

void main()
{
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    float relative_time = u_time * 0.3;

    center_of_circle.y = sin(relative_time) / 1.2;

    vec4 pct = vec4(st.x);
    pct.r = (st.y - center_of_circle.y) * (st.y - center_of_circle.y) + (st.x - 0.5) * (st.x -0.5);
    pct.g = pow(st.y * 2.0 - 1.0, 0.9);
    pct.b = pow(1.0 - st.y * 2.0, 0.4);
    pct.a = plot(st, sin(st.x * 80.) / 10.0);

    float tan_pct = tan(st.y);

    vec3 sun = vec3(0.9882, 0.8471, 0.3922);
    vec3 sun_bright = vec3(0.8784, 0.4667, 0.0824) + sin(relative_time) / 1.2;
    vec3 origin_sky = vec3(0.3608, 0.8157, 0.9922) + sin(relative_time) / 3.0;
    vec3 ocean = vec3(0.2627, 0.2824, 0.5608)  + sin(relative_time) / 6.0;
    // vec4 wave = vec4(0.149, 0.2863, 0.7412, 0.096);
    vec3 ground = vec3(0.5059, 0.2706, 0.0784);

    // sun
    vec3 final_sun = mix(vec3(1.0), sun, pct.r * 100.0);
    // sky
    vec3 final_sky = mix(sun_bright, origin_sky, pct.g);
    final_sky = mix(final_sky, final_sun, circle_check(0.1, st));
    final_sky = clamp(final_sky, 0., 1.0);
    // ocean
    vec3 final_ocean = mix(sun_bright, ocean, pct.b);
    final_ocean = clamp(final_ocean, 0., 1.0);
    // wave
    // vec4 final_wave = mix(vec4(final_ocean, 1.0), wave, pct.a);
    // ground
    vec3 final_ground = mix(ground,vec3(0.0588, 0.0039, 0.0039), pct.b * 1.5);
    final_ground = clamp(final_ground, 0., 1.0);
    //final_ground = mix(final_ground, final_sun, clamp(center_of_circle.y, 0.5, 1.0));

    vec3 final_color = mix(final_ocean, final_sky, step(0.5,st.y));
    // final_color = mix(final_sun, final_ground, 1. - step(0.5, st.y));
    
    FragColor = vec4(final_color, 1.0);
    // FragColor = vec4(final_sun, 1.0);
}
