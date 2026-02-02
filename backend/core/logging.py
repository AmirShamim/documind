import logging


def setup_logging() -> logging.Logger:
    logger = logging.getLogger("documind")
    if not logger.handlers:
        logging.basicConfig(level=logging.INFO)
    return logger
