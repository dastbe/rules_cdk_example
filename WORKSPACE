workspace(name = "rules_cdk_example")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "contrib_rules_cdk",
    sha256 = "893cb0ba9ac5cf6cf0381355c702fbba481a78bf673a6aeda58ba0545dfb5699",
    strip_prefix = "rules_cdk-0.4.0",
    url = "https://github.com/dastbe/rules_cdk/archive/refs/tags/v0.4.0.tar.gz",
)

http_archive(
    name = "rules_pkg",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_pkg/releases/download/0.8.0/rules_pkg-0.8.0.tar.gz",
        "https://github.com/bazelbuild/rules_pkg/releases/download/0.8.0/rules_pkg-0.8.0.tar.gz",
    ],
    sha256 = "eea0f59c28a9241156a47d7a8e32db9122f3d50b505fae0f33de6ce4d9b61834",
)

http_archive(
    name = "aspect_bazel_lib",
    sha256 = "be236556c7b9c7b91cb370e837fdcec62b6e8893408cd4465ae883c9d7c67024",
    strip_prefix = "bazel-lib-1.18.0",
    url = "https://github.com/aspect-build/bazel-lib/archive/refs/tags/v1.18.0.tar.gz",
)

http_archive(
    name = "bazel_gazelle",
    sha256 = "448e37e0dbf61d6fa8f00aaa12d191745e14f07c31cabfa731f0c8e8a4f41b97",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-gazelle/releases/download/v0.28.0/bazel-gazelle-v0.28.0.tar.gz",
        "https://github.com/bazelbuild/bazel-gazelle/releases/download/v0.28.0/bazel-gazelle-v0.28.0.tar.gz",
    ],
)

http_archive(
    name = "aspect_rules_js",
    sha256 = "66ecc9f56300dd63fb86f11cfa1e8affcaa42d5300e2746dba08541916e913fd",
    strip_prefix = "rules_js-1.13.0",
    url = "https://github.com/aspect-build/rules_js/archive/refs/tags/v1.13.0.tar.gz",
)

http_archive(
    name = "io_bazel_rules_go",
    sha256 = "56d8c5a5c91e1af73eca71a6fab2ced959b67c86d12ba37feedb0a2dfea441a6",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/v0.37.0/rules_go-v0.37.0.zip",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.37.0/rules_go-v0.37.0.zip",
    ],
)

http_archive(
    name = "io_bazel_rules_docker",
    sha256 = "b1e80761a8a8243d03ebca8845e9cc1ba6c82ce7c5179ce2b295cd36f7e394bf",
    urls = ["https://github.com/bazelbuild/rules_docker/releases/download/v0.25.0/rules_docker-v0.25.0.tar.gz"],
)

http_archive(
    name = "rules_jvm_external",
    strip_prefix = "rules_jvm_external-4.5",
    sha256 = "b17d7388feb9bfa7f2fa09031b32707df529f26c91ab9e5d909eb1676badd9a6",
    url = "https://github.com/bazelbuild/rules_jvm_external/archive/refs/tags/4.5.zip",
)

######################
# rules_pkg setup #
######################
load("@rules_pkg//:deps.bzl", "rules_pkg_dependencies")

rules_pkg_dependencies()

######################
# aspect_bazel_lib setup #
######################
load("@aspect_bazel_lib//lib:repositories.bzl", "aspect_bazel_lib_dependencies")

aspect_bazel_lib_dependencies()

######################
# rules_cdk setup #
######################
load("@contrib_rules_cdk//cdk:repositories.bzl", "rules_cdk_dependencies")

rules_cdk_dependencies()

# Fetch and register a nodejs interpreter, if you haven't already
load("@rules_nodejs//nodejs:repositories.bzl", "DEFAULT_NODE_VERSION", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "nodejs",
    node_version = DEFAULT_NODE_VERSION,
)

load("@contrib_rules_cdk//cdk:dependencies.bzl", "cdk_repositories")

cdk_repositories()

load("@cdk//:npm_repositories.bzl", cdk_npm_repositories = "npm_repositories")

cdk_npm_repositories()

######################
# rules_js setup #
######################
load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")

rules_js_dependencies()

load("@aspect_rules_js//npm:npm_import.bzl", "npm_translate_lock")

npm_translate_lock(
    name = "npm",
    pnpm_lock = "//:pnpm-lock.yaml",
    verify_node_modules_ignored = "//:.bazelignore",
)

load("@npm//:repositories.bzl", "npm_repositories")

npm_repositories()

######################
# rules_go setup #
######################
load("@io_bazel_rules_go//go:deps.bzl", "go_register_toolchains", "go_rules_dependencies")

go_rules_dependencies()

go_register_toolchains(version = "1.19.3")

######################
# rules_jvm_exernal setup #
######################
load("@rules_jvm_external//:repositories.bzl", "rules_jvm_external_deps")

rules_jvm_external_deps()

load("@rules_jvm_external//:setup.bzl", "rules_jvm_external_setup")

rules_jvm_external_setup()

load("@rules_jvm_external//:defs.bzl", "maven_install")

maven_install(
    artifacts = [
        "com.amazonaws:aws-lambda-java-core:1.2.2",
    ],
    repositories = [
        "https://repo1.maven.org/maven2",
    ],
)

######################
# bazelle_go setup #
######################
load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies")
load("//:deps.bzl", "go_dependencies")

# gazelle:repository_macro deps.bzl%go_dependencies
go_dependencies()

gazelle_dependencies()


######################
# rules_docker setup #
######################

load("@io_bazel_rules_docker//repositories:repositories.bzl", container_repositories = "repositories")
container_repositories()

load("@io_bazel_rules_docker//repositories:deps.bzl", container_deps = "deps")

container_deps()

load("@io_bazel_rules_docker//go:image.bzl", go_image_repos = "repositories")

go_image_repos()
