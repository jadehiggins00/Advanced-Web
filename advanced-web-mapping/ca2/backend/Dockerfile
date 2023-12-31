# Start from an existing image with Miniconda installed
FROM continuumio/miniconda3

ENV PYTHONUNBUFFERED 1
ENV DJANGO_SETTINGS_MODULE=backend.settings

# Ensure that everything is up-to-date
RUN apt-get update && apt-get upgrade -y && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Node.js and Yarn
RUN apt-get update && \
    apt-get install -y curl gnupg build-essential && \
    curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && \
    apt-get install -y yarn

# Install additional necessary packages
RUN apt-get update && \
    apt-get install -y \
    build-essential \
    libcairo2 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libgdk-pixbuf2.0-0 \
    libffi-dev \
    shared-mime-info && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Make a working directory in the image and set it as the working dir
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Copy the entire frontend directory
COPY frontend /usr/src/app/backend/frontend

# Navigate to the frontend directory, install dependencies, and build the React app
WORKDIR /usr/src/app/backend/frontend
RUN yarn install
RUN yarn build

# Navigate back to the main app directory (which is the root directory for Django project)
WORKDIR /usr/src/app/backend

# Copy the environment file and create the conda environment
COPY ENV.yml /usr/src/app/backend
RUN conda env create -n milo_is_gay --file ENV.yml

# Activate the conda environment
RUN echo "conda activate milo_is_gay" >> ~/.bashrc
SHELL ["/bin/bash", "--login", "-c"]

# Set up conda to match our test environment
RUN conda config --add channels conda-forge && conda config --set channel_priority strict
RUN cat ~/.condarc
RUN conda install uwsgi

# Copy everything in your Django project to the image.
COPY . /usr/src/app/backend

# Install Python dependencies
RUN pip install -r requirements.txt

# Collect static files
RUN python manage.py collectstatic --no-input

# Expose port 8001 on the image. We'll map a localhost port to this later.
EXPOSE 8001

# Run "uwsgi" within the Conda environment
CMD ["conda", "run", "-n", "milo_is_gay", "uwsgi", "--ini", "uwsgi.ini"]
