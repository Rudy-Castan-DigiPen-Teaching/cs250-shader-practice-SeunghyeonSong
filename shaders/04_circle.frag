#version 300 es

precision mediump float;

/**
 * \file 04_circle.frag
 * \author Seunghyeon Song
 * \date 2025 Spring
 * \par CS250 Computer Graphics II
 * \copyright DigiPen Institute of Technology
 */

 out vec4 FragColor;

 uniform vec2 u_resolution;
 uniform vec2 u_mouse;
 uniform float u_time;

// Convert pixel coords to normalized coords
 vec2 to_coord(vec2 pixel_point)
 {
    vec2 point = pixel_point / u_resolution;
    if(u_resolution.x > u_resolution.y)
    {
        // wide not tall
        // height is going to between 0-1
        // width is going to be expanded, larger than 0-1
        point.x *= u_resolution.x / u_resolution.y;
        // now to recenter the range
        point.x += (u_resolution.y - u_resolution.x) / (u_resolution.x);
    }
    else
    {
        point.y *= u_resolution.y / u_resolution.x;
        point.y += (u_resolution.x - u_resolution.y) / u_resolution.y;
    }

    return point;
 }

 float sCircle(vec2 point, vec2 center, float radius)
 {
    float d = distance(point, center);
    return d - radius;
 }

 // return 0 not in circle, 1 in circle
 float circle(vec2 point, vec2 center, float radius)
 {
    float sd = sCircle(point, center, radius);
    // return 1.0 - step(0., sd);
    float E = fwidth(sd);
    return 1. - smoothstep(-E, E, sd);
 }

 // Maybe make function?
 // Maybe add shade for plaent? Using projection.

 void main(void)
 {
    vec2 position = to_coord(gl_FragCoord.xy);
    vec3 color = vec3(0.0, 0.0, 0.0);

    vec3 shade = vec3(0.5, 0.5, 0.5);
  
    // star
    vec2 p1 = vec2(0.5f, 0.5f);
    float r1 = 0.1f;
    float t1 = circle(position, p1, r1);
    float s1 = distance(position, p1) * 12.f;
    vec3 color1 = mix(vec3(0.7725, 0.1294, 0.1294), vec3(0.4784, 0.0118, 0.0118), s1);

    // planet1
    float speed1 = 1.5f;
    vec2 p2 = p1 + vec2(0.2 * cos(u_time * speed1), 0.2 * sin(u_time * speed1));
    float r2 = 0.025f;
    float t2 = circle(position, p2, r2);
    float s2 = distance(position, p2) * 35.f;
    vec3 color2 = mix(vec3(0.0157, 0.1294, 0.7725), vec3(0.0941, 0.0078, 0.4588), s2);

    // satelite
    vec2 p3 = p2 + vec2(0.05 * cos(u_time * speed1), 0.05 * sin(u_time * speed1));
    float r3 = 0.009f;
    float t3 = circle(position, p3, r3);
    float s3 = distance(position, p3) * 150.f;
    vec3 color3 = mix(vec3(0.4471, 0.4471, 0.4471), vec3(0.2824, 0.2824, 0.2863), s3);
    
    // planet2
    float speed2 = 1.25f;
    vec2 p4 = p1 + vec2(0.5 * cos(u_time * speed2), 0.5 * sin(u_time * speed2));
    float r4 = 0.05f;
    float t4 = circle(position, p4, r4);
    float s4 = distance(position, p4) * 14.f;
    vec3 color4 = mix(vec3(0.7451, 0.349, 0.0235), vec3(0.2863, 0.1569, 0.0078), s4);

    // planet3
    float speed3 = 1.75f;
    vec2 p5 = p1 + vec2(0.35 * cos(u_time * speed3), 0.35 * sin(u_time * speed3));
    float r5 = 0.035f;
    float t5 = circle(position, p5, r5);
    float s5 = distance(position, p5) * 14.f;
    vec3 color5 = mix(vec3(0.0, 0.7255, 0.1216), vec3(0.2863, 0.1569, 0.0078), s5);

    // shooting star
    float speed4 = 2.5f;
    vec2 p6 = p1 + vec2(0.35 * cos(u_time * speed4), 0.15 * sin(u_time * speed4));
    float r6 = 0.005f;
    float t6 = circle(position, p6, r6);
    float s6 = distance(position, p6) * 285.f;
    vec3 color6 = mix(vec3(0.0, 0.5647, 0.9412), vec3(0.0, 0.4706, 0.6118), s6);

    color = mix(color, color1, t1);
    color = mix(color, color2, t2);
    color = mix(color, color3, t3);
    color = mix(color, color4, t4);
    color = mix(color, color5, t5);
    color = mix(color, color6, t6);
    
    FragColor = vec4(color, 1.0);
 }