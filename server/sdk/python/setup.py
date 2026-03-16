from setuptools import setup, find_packages

setup(
    name="schemeskill-connect",
    version="0.1.0",
    packages=find_packages(),
    install_requires=[
        "requests>=2.31.0",
        "python-dotenv>=1.0.0",
    ],
    author="SchemeSkill Connect Team",
    author_email="contact@schemeskill.com",
    description="Python SDK for SchemeSkill Connect API",
    long_description=open("README.md").read(),
    long_description_content_type="text/markdown",
    url="https://github.com/schemeskill/connect",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Programming Language :: Python :: 3.10",
    ],
    python_requires=">=3.8",
) 