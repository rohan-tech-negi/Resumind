import {type RouteConfig, index, route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('/auth', 'routes/auth.tsx'),
    route('/upload', 'routes/upload.tsx'),
    route('/dashboard', 'routes/dashboard.tsx'),
    route('/resume/:id', 'routes/resume.tsx'),
    route('/about', 'routes/about.tsx'),
    route('/wipe', 'routes/wipe.tsx'),
] satisfies RouteConfig;
